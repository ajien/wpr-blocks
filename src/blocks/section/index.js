/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import './style.scss';
import './editor.scss';

import editSection from './edit'
import saveSection from './save'
import blockAttributes from './attributes'

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { __ } = wp.i18n; // Import __() from wp.i18n
const { 
	withFallbackStyles,
} = wp.components;
const { compose } = wp.compose;
const {
	withColors,
} = wp.editor;

const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		// fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		// fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

 /**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wpr/section-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Section' ), // Block title.
	icon: 'screenoptions', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'section' ),
		__( 'container' ),
	],
	supports: {
		align: [ 'center', 'wide', 'full' ], //set to true to enable all options
	},
	attributes: blockAttributes,
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: compose( [
		withColors( 'backgroundColor', { textColor: 'color' } ),
		FallbackStyles,
	] )( editSection ),


	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: saveSection,
	/**
	 * wrapper props
	 * @param {*} attributes 
	 */
	getEditWrapperProps( attributes ) {
		return { 'data-align': attributes.align };
	},
} );
