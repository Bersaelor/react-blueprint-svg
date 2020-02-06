/**
 * @className Blueprint
 */

import * as React from 'react'

import { I18nextProvider } from 'react-i18next';

import i18n from './localization/i18n';
import { StateProvider } from './store';
import Blueprint from './components/Blueprint';
import { OptionState } from './store/state'

export type Props = { svg: string, options?: OptionState }

const Main = ({ svg, options }: Props) => {
  return <I18nextProvider i18n={i18n}>
    <StateProvider options={options}>
      <Blueprint svg={svg}/>
    </StateProvider>
  </I18nextProvider>
}

export default Main