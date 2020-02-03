/**
 * @className Blueprint
 */

import * as React from 'react'
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux'

import i18n from './localization/i18n';
import Blueprint from './components/Blueprint';
import store from './store'

export type Props = { svg: string }

const Main = ({ svg }: Props) => {

  return <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Blueprint svg={svg}/>
    </Provider>
  </I18nextProvider>
}

export default Main