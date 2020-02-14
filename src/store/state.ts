import * as makerjs from 'makerjs'
import * as React from 'react';

type ContentState = typeof initialContent
type ViewState = typeof initialView

type RootState = {
    content: ContentState
    options: OptionState
    view: ViewState
}

interface SVGProps {
    width: string
    height: string
    viewBox: string
    xmlns: string
    children: any[]
}

const initialContent: {
    measurement: makerjs.IMeasureWithCenter | null
    model: makerjs.IModel | null
    svgNode: React.ReactElement<SVGProps, any> | null
} = {
    measurement: null,
    model: null,
    svgNode: null
}

type OptionState = {
    fitOnScreen: boolean
    showGrid: boolean
    showPathNames: boolean
    showPathFlow: boolean
    unitString?: string
}

const initialOptions: OptionState = {
    fitOnScreen: false,
    showGrid: true,
    showPathNames: false,
    showPathFlow: false,
    unitString: undefined
}

const initialView: {
    cursor: makerjs.IPoint
    isMouseDown: boolean
    origin: makerjs.IPoint
    panOffset: makerjs.IPoint
    scale: number
    viewOffset: makerjs.IPoint
    viewSize: number[]
} = {
    cursor: [0,0],
    isMouseDown: false,
    origin: [0, 0],
    panOffset: [0,0],
    scale: 1,
    viewOffset: [0,0],
    viewSize: [0, 0]
}

const initialState: RootState = {
    content: initialContent,
    options: initialOptions,
    view: initialView
}

export { initialState, RootState, ContentState, ViewState, OptionState, SVGProps }