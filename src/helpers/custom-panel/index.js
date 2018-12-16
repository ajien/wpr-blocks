const { assign } = lodash;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { TextControl, ToggleControl, PanelBody } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.editor;



/**
 * Override the default edit UI to include a new block inspector control for
 * adding our custom control.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export const addMyCustomBlockControls = createHigherOrderComponent( ( BlockEdit ) => {

    return ( props ) => {

        // If this block supports scheduling and is currently selected, add our UI
        if ( isValidBlockType( props.name ) && props.isSelected ) {
            return (
                <Fragment>
                    <BlockEdit { ...props } />
                    <InspectorControls>
                        <PanelBody title={ __( 'Custom Field Settings' ) }>
                            <ToggleControl
                                label={ __( 'Set as metadata' ) }
                                help={ __( 'Specify whether this block\'s content is saved as metadata.' ) }
                                value={ props.attributes.as_metadata || false }
                                onChange={ ( nextValue ) => {
                                    props.setAttributes( {
                                        as_metadata: nextValue,
                                    } );
                                } }
                                checked={ props.attributes.as_metadata }
                            />
                            {props.attributes.as_metadata &&
                                <TextControl
                                    label={ __( 'Meta Key' ) }
                                    help={ __( 'Specify the meta key to use for this block.' ) }
                                    value={ props.attributes.meta_key || '' }
                                    onChange={ ( nextValue ) => {
                                        props.setAttributes( {
                                            meta_key: nextValue,
                                        } );
                                    } } />
                            }
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        }

        console.log(props.attributes);

        return <BlockEdit { ...props } />;
    };
}, 'addMyCustomBlockControls' );

addFilter( 'editor.BlockEdit', 'wpr/custom-control', addMyCustomBlockControls );


/**
 * Is the passed block name one which supports our custom field?
 *
 * @param {string} name The name of the block.
 */
function isValidBlockType( name ) {

    const validBlockTypes = [
        'core/paragraph',
        'core/image',
        'core/heading',
    ];

    return validBlockTypes.includes( name );

}// end isValidBlockType()

/**
 * Filters registered block settings, extending attributes with our custom data.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute( settings ) {

	// If this is a valid block
	if ( isValidBlockType( settings.name ) ) {

		// Use Lodash's assign to gracefully handle if attributes are undefined
		settings.attributes = assign( settings.attributes, {
			as_metadata: {
				type: 'boolean',
			},
			meta_key: {
				type: 'string',
			},
		} );
	}

	return settings;

}// end addAttribute()

/**
 * Override props assigned to save component to inject our custom data.
 * This is only done if the component is a valid block type.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps( extraProps, blockType, attributes ) {

	// If the current block is valid, add our prop.
	if ( isValidBlockType( blockType.name ) ) {
		extraProps.meta_key = attributes.meta_key;
		extraProps.as_metadata = attributes.as_metadata;
	}

	return extraProps;

}// end addSaveProps()

addFilter( 'blocks.registerBlockType', 'wpr/add-attr', addAttribute );
addFilter( 'blocks.getSaveContent.extraProps', 'wpr/add-props', addSaveProps );