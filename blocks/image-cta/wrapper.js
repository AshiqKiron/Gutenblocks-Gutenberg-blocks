import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  relativeRange
} from '@gblx/utils/math'

const Wrapper = ({ 
  children, 
  background, 
  fixedBackground, 
  textAlignment, 
  textBrightness, 
  overlayColor, 
  overlayOpacity, 
  verticalAlignment,
  verticalPadding,
  horizontalPadding,
  spacing 
}) => (
  <section 
    className={classNames('gblx-image-cta', {
      'has-parallax': fixedBackground,
      'has-left-alignment': textAlignment === 'left',
      'has-right-alignment': textAlignment === 'right',
    })} 
    style={{ 
      color: `hsl(0, 0%, ${textBrightness}%)`,
      backgroundImage: `url(${background})`, 
      padding: `${verticalPadding}px ${horizontalPadding}px`,
      marginBottom: `${spacing}px`
    }}>
    <div 
      style={{ 
        background: overlayColor,
        opacity: overlayOpacity > 0 ? overlayOpacity / 100 : 0
      }} 
      className="gblx-image-cta__overlay" />
    <div 
      className="gblx-image-cta__inner"
      style={{
        top: `${-(relativeRange(-100, 100, verticalAlignment))}px`
      }}>
      {children}
    </div>
  </section>
)

Wrapper.propTypes = {
  background: PropTypes.string,
  fixedBackground: PropTypes.bool,
  textAlignment: PropTypes.string,
  textBrightness: PropTypes.number,
  overlayColor: PropTypes.string,
  overlayOpacity: PropTypes.number,
  verticalAlignment: PropTypes.number,
  verticalPadding: PropTypes.number,
  horizontalPadding: PropTypes.number,
  spacing: PropTypes.number
}

export default Wrapper