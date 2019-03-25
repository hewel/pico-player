import React from 'react'
import { iconfont } from './index.sass'

export default function Icon(props) {
    const { symbol, ...otherProps } = props
    return (
        <div {...otherProps}>
            <svg className={iconfont} aria-hidden="true">
                <use xlinkHref={`#icon-${symbol}`}></use>
            </svg>
        </div>
    )
}
