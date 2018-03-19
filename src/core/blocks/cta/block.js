import classNames from 'classnames'
import { 
	__ 
} from '@wordpress/i18n'
import { 
	ColorPalette,
	RichText,
	PlainText,
	ImagePlaceholder,
	InspectorControls,
	registerBlockType,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	MediaUpload,
	UrlInput,
	UrlInputButton
} from '@wordpress/blocks'
import {
	PanelBody,
	RangeControl,
	Toolbar,
	Button,
	IconButton,
	FormToggle,
	BaseControl
} from '@wordpress/components'
import {
	Component
} from '@wordpress/element'
import {
	relativeRange 
} from '@gblx/utils/math'
import {
	LinkButton
} from '@gblx/components'
import styles from './block.scss'

/**
 * GBLX Call To Action Module.
 * 
 * @since 1.0.0
 */
class GblxCta extends Component {
	title = __('GBLX CTA', 'gblx')
	icon = 'megaphone'
	category = 'common'
	attributes = {
		headerText: {
			source: 'children',
			selector: 'h2'
		},
		bodyContent: {
			source: 'children',
			selector: 'p'
		},
		background: {
			type: 'string'
		},
		textAlignment: {
			type: 'string'
		},
		verticalAlignment: {
			type: 'integer',
			default: 50
		},
		headerFontSize: {
			type: 'integer',
			default: 32
		},
		contentFontSize: {
			type: 'integer',
			default: 24
		},
		overlayOpacity: {
			type: 'integer',
			default: 0
		},
		overlayColor: {
			type: 'string',
			default: 'rgb(49,49,49)'
		},
		fixedBackground: {
			type: 'boolean'
		},
		showSecondaryCallout: {
			type: 'boolean'
		},
		primaryCalloutText: {
			source: 'children',
			selector: '.gblx-primary-cta'
		},
		secondaryCalloutText: {
			source: 'children',
			selector: '.gblx-secondary-cta'
		},
		primaryCalloutURL: {
			type: 'text' 
		},
		secondaryCalloutURL: {
			type: 'text'
		},
		textBrightness: {
			type: 'integer',
			default: 100
		},
		primaryColor: {
			type: 'string'
		},
		accentColor: {
			type: 'string'
		},
		calloutBorder: {
			type: 'integer',
			default: 2
		},
		calloutBorderRadius: {
			type: 'integer',
			default: 4
		},
		calloutShowBackground: {
			type: 'boolean',
			default: true
		},
		calloutTransformText: {
			type: 'boolean',
			default: true
		},
		calloutMargin: {
			type: 'integer',
			default: 5
		},
		calloutPadding: {
			type: 'integer',
			default: 5
		}
	}
	
	renderInspector = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			headerFontSize,
			contentFontSize,
			overlayOpacity,
			overlayColor,
			fixedBackground,
			textAlignment,
			textBrightness,
			showSecondaryCallout,
			primaryColor,
			accentColor,
			calloutMargin,
			calloutPadding,
			calloutBorder,
			calloutBorderRadius,
			calloutShowBackground,
			calloutTransformText,
			verticalAlignment,
			primaryCalloutURL,
			secondaryCalloutURL
		} = attributes
		return (
			<InspectorControls>
				<div>
					<h2>{ __('Display Settings', 'gblx')}</h2>
					<BaseControl
						id="gblx-secondary-cta-toggle"
						className="blocks-toggle-control"
						label={__('Secondary Callout', 'gblx')}>
						<FormToggle 
							id="gblx-secondary-cta-toggle"
							checked={showSecondaryCallout}
							onChange={(e) => setAttributes({ showSecondaryCallout: e.target.checked })} />
					</BaseControl>
					<RangeControl
						min={0}
						max={100}
						value={verticalAlignment}
						label={__('Vertical Alignment', 'gblx')}
						onChange={(verticalAlignment) => setAttributes({ verticalAlignment })} />
					<div className={styles.links}>
						<BaseControl
							id="gblx-cta-primary-link"
							label={__('Primary Callout Link', 'gblx')}>
							<input
								type="url"
								id="gblx-cta-primary-link"
								value={primaryCalloutURL}
								onChange={(e) => setAttributes({ primaryCalloutURL: e.target.value })} />
						</BaseControl>
						{ showSecondaryCallout 
						? <BaseControl
								id="gblx-cta-secondary-link"
								label={__('Secondary Callout Link', 'gblx')}>
								<input
									type="url"
									id="gblx-cta-secondary-link"
									value={secondaryCalloutURL}
									onChange={(e) => setAttributes({ secondaryCalloutURL: e.target.value })} />
							</BaseControl>
						: null }
					</div>
				</div>
				<PanelBody title={__('Primary Color', 'gblx')}>
					<ColorPalette 
							value={primaryColor} 
							onChange={(primaryColor) => setAttributes({ primaryColor })} />
				</PanelBody>
				<PanelBody title={__('Accent Color', 'gblx')}>
					<ColorPalette 
						value={accentColor} 
						onChange={(accentColor) => setAttributes({ accentColor })} />
				</PanelBody>
				<PanelBody title={__('Callout Buttons', 'gblx')}>
					<BaseControl
						id="gblx-cta-background-toggle"
						className="blocks-toggle-control"
						label={__('Show Background', 'gblx')}>
							<FormToggle 
								id="gblx-cta-background-toggle"
								checked={calloutShowBackground}
								onChange={(e) => setAttributes({ calloutShowBackground: e.target.checked })} />
					</BaseControl>
					<BaseControl
						id="gblx-cta-transform-text-toggle"
						className="blocks-toggle-control"
						label={__('Transform Text', 'gblx')}>
							<FormToggle 
								id="gblx-cta-transform-text-toggle"
								checked={calloutTransformText}
								onChange={(e) => setAttributes({ calloutTransformText: e.target.checked })} />
					</BaseControl>
					<RangeControl
						min={0}
						max={4}
						value={calloutBorder}
						label={__('Border Thickness', 'gblx')}
						onChange={(calloutBorder) => setAttributes({ calloutBorder })} />
					<RangeControl
						min={0}
						max={100}
						value={calloutBorderRadius}
						label={__('Border Radius', 'gblx')}
						onChange={(calloutBorderRadius) => setAttributes({ calloutBorderRadius })} />
					{ showSecondaryCallout 
							? <RangeControl
									min={5}
									max={30}
									value={calloutMargin}
									label={__('Margin', 'gblx')}
									onChange={(calloutMargin) => setAttributes({ calloutMargin })} />
							: null
					}
					<RangeControl
						min={5}
						max={30}
						value={calloutPadding}
						label={__('Padding', 'gblx')}
						onChange={(calloutPadding) => setAttributes({ calloutPadding })} />
				</PanelBody>
				<PanelBody title={__('Background Settings', 'gblx')}>
					<RangeControl
						min={0}
						max={100}
						value={overlayOpacity}
						label={__('Overlay Opacity', 'gblx')}
						onChange={(overlayOpacity) => setAttributes({ overlayOpacity })} />
					<ColorPalette 
						value={overlayColor} 
						onChange={(overlayColor) => setAttributes({ overlayColor })} />
					<BaseControl
						id="gblx-fixed-background-toggle"
						className="blocks-toggle-control"
						label={__('Fixed Background', 'gblx')}>
						<FormToggle 
							id="gblx-fixed-background-toggle"
							checked={fixedBackground}
							onChange={(e) => setAttributes({ fixedBackground: e.target.checked })}/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Text Settings', 'gblx')}>
					<RangeControl
						min={16}
						max={32}
						value={headerFontSize}
						label={__('Header Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(headerFontSize) => setAttributes({ headerFontSize })} />
					<RangeControl
						min={12}
						max={24}
						value={contentFontSize}
						label={__('Content Font Size', 'gblx')}
						beforeIcon="editor-textcolor"
						onChange={(contentFontSize) => setAttributes({ contentFontSize })} />
					<RangeControl
						min={0}
						max={100}
						value={textBrightness}
						label={__('Brightness', 'gblx')}
						onChange={(textBrightness) => setAttributes({ textBrightness })} />
					<BaseControl
						label={__('Text Alignment', 'gblx')}>
						<AlignmentToolbar 
							value={textAlignment} 
							onChange={(textAlignment) => setAttributes({ textAlignment })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		)
	}

	renderToolbar = (isSelected, attributes, setAttributes) => {
		if (!isSelected) {
			return null
		}
		const {
			textAlignment,
			background
		} = attributes
		return (
			<BlockControls>
				{
					background 
					? <div>
							<AlignmentToolbar 
								value={textAlignment} 
								onChange={(textAlignment) => setAttributes({ textAlignment })} />
							<Toolbar>
								<MediaUpload
									type="image"
									render={({ open }) => (
										<IconButton 
											icon="format-image" 
											onClick={open}
											tooltip={__('Edit Image', 'gblx')} />
									)} 
									onSelect={(media) => setAttributes({ background: media.url })} />
							</Toolbar>
						</div>	
					: null
				}
			</BlockControls> 
		)
	}

	edit = ({ className, attributes, setAttributes, isSelected }) => {
		const {
			background,
			bodyContent,
			headerText,
			headerFontSize,
			contentFontSize,
			overlayColor,
			overlayOpacity,
			fixedBackground,
			textAlignment,
			textBrightness,
			primaryCalloutText,
			secondaryCalloutText,
			showSecondaryCallout,
			primaryColor,
			accentColor,
			calloutBorder,
			calloutBorderRadius,
			calloutShowBackground,
			calloutTransformText,
			calloutMargin,
			calloutPadding,
			verticalAlignment,
			primaryCalloutURL
		} = attributes
		const ctaStyle = {
			color: accentColor,
			background: calloutShowBackground ? primaryColor : 'transparent',
			border: `${calloutBorder}px solid ${accentColor}`,
			borderRadius: `${calloutBorderRadius}px`,
			textTransform: calloutTransformText ? 'uppercase': 'inherit',
			padding: `0 ${calloutPadding}px`
		}
		const margin = `${calloutMargin > 0 ? calloutMargin / 2 : 0}px`;
		return (
			<div>
				{this.renderInspector(isSelected, attributes, setAttributes)}
				{this.renderToolbar(isSelected, attributes, setAttributes)}
				{ !background 
						?	<ImagePlaceholder onSelectImage={(media) => setAttributes({ background: media.url })} />
						: <section 
								className={classNames({
									[styles['cta-background']]: true,
									[styles['has-parallax']]: fixedBackground,
									[styles['has-left-alignment']]: textAlignment === 'left',
									[styles['has-right-alignment']]: textAlignment === 'right',
								})} 
								style={{ 
									color: `hsl(0, 0%, ${textBrightness}%)`,
									backgroundImage: `url(${background})`, 
								}}>
								<div 
									style={{ 
										background: overlayColor,
										opacity: overlayOpacity > 0 ? overlayOpacity / 100 : 0
									}} 
									className={styles['overlay']} />
								<div 
									className={styles.inner}
									style={{
										top: `${-(relativeRange(-100, 100, verticalAlignment))}px`
									}}>
									<RichText 
										tagName="h2"
										value={headerText}
										className={styles.header}
										style={{ 
											fontSize: `${headerFontSize}px`,
											lineHeight: `${headerFontSize}px`, 
										}}
										placeholder={__('Heading Text', 'gblx')}
										onChange={(headerText) => setAttributes({ headerText })} />
									<RichText 
										tagName="p"
										value={bodyContent}
										className={styles.content}
										style={{ 
											fontSize: `${contentFontSize}px`,
											lineHeight: `${contentFontSize}px` 
										}}
										placeholder={__('Content Area', 'gblx')}
										onChange={(bodyContent) => setAttributes({ bodyContent })} />	
									<div className={styles.callouts}>
										<LinkButton
											value={primaryCalloutText}
											className={styles['primary-cta']}
											placeholder={__('Action 1', 'gblx')}
											style={{ ...ctaStyle, marginRight: margin }}
											onChange={(primaryCalloutText) => setAttributes({ primaryCalloutText })} />
										{
											showSecondaryCallout 
												? <LinkButton
														value={secondaryCalloutText}
														className={styles['secondary-cta']}
														placeholder={__('Action 2', 'gblx')}
														style={{ ...ctaStyle, marginLeft: margin }}
														onChange={(secondaryCalloutText) => setAttributes({ secondaryCalloutText })}	/>
												: null }
									</div>
								</div>	
							</section>
				}
			</div>
		)
	}

	save = ({ attributes }) => {
		const {
			background,
			textColor,
			alignment,
			bodyContent,
			headerText,
			headerFontSize,
			contentFontSize,
			overlayColor,
			overlayOpacity,
			primaryCalloutText,
			secondaryCalloutText
		} = attributes
		return (
			<section 
				style={{
					backgroundImage: `url(${background})`
				}}>
				<div>
					<h2>{ headerText }</h2>
					<p>{ bodyContent }</p>
				</div>
				<div>
					<Button 
						className="gblx-primary-cta">
						{ primaryCalloutText }
					</Button>
					<Button 
						className="gblx-secondary-cta">
						{ secondaryCalloutText }
					</Button>
				</div>
			</section>
		)
	}

}

export default registerBlockType('gblx/cta', new GblxCta())

console.log(wp)