import React from 'react'
import PropTypes from 'prop-types'

import { iconfont } from './index.sass'

export default function Icon(props) {
    const { symbol, ...otherProps } = props
    return (
        <div {...otherProps}>
            <svg className={iconfont} aria-hidden="true">
                <use xlinkHref={`#icon-${symbol}`} />
            </svg>
        </div>
    )
}
Icon.propTypes = {
    symbol: PropTypes.string,
}
Icon.defaultProps = {
    symbol: 'playarrow',
}
