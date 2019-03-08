import React, { Component } from 'react'
import { iconfont } from './index.sass'

export default class Icon extends Component {
    render() {
        const { symbol, ...otherProps } = this.props
        return (
            <div {...otherProps}>
                <svg className={iconfont} aria-hidden="true">
                    <use xlinkHref={`#icon-${symbol}`}></use>
                </svg>
            </div>
        )
    }
}
