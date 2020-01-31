/**
 * @className Blueprint
 */

import * as React from 'react'

import { I18nextProvider } from 'react-i18next';

import i18n from './localization/i18n';
import Blueprint from './components/Blueprint';

export type Props = { svg: string }

const Main = ({ svg }: Props) => {

  return <I18nextProvider i18n={i18n}>
    <Blueprint svg={svg}/>
  </I18nextProvider>
}

export default Main