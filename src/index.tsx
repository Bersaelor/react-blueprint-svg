import * as React from 'react'
import * as makerjs from 'makerjs'

import { I18nextProvider } from 'react-i18next';

import i18n from './localization/i18n';
import { StateProvider } from './store';
import Blueprint from './components/Blueprint';
import { OptionState } from './store/state'

export type Props = { model: makerjs.IModel | string, options?: OptionState }

const Main = ({ model, options }: Props) => {
  return <I18nextProvider i18n={i18n}>
    <StateProvider options={options} model={model}>
      <Blueprint/>
    </StateProvider>
  </I18nextProvider>
}

export default Main