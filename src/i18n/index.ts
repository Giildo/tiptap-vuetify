import en from './en'
import ru from './ru'
import ConsoleLogger from '~/logging/ConsoleLogger'
import { TiptapVuetifyPlugin } from '~/main'

export const defaultLanguage = 'en'

export const dictionary = {
  en,
  ru
}

export function getCurrentLang () {
  const vuetifyLang = TiptapVuetifyPlugin.vuetifyLang

  if (!vuetifyLang) {
    return defaultLanguage
  }

  return vuetifyLang
}

export function getMsg (path: string, args?): string {
  let currentLang = getCurrentLang()

  if (!dictionary[currentLang]) {
    currentLang = defaultLanguage

    ConsoleLogger.warn(`The current language "${currentLang}" is not yet available. Using language "${defaultLanguage}" by default.`)
  }

  const dictionaryByLang = dictionary[currentLang]
  const target = path.split('.').reduce((prev: string, curr: string) => {
    return prev[curr]
  }, dictionaryByLang)

  if (target instanceof Function) {
    return target(args)
  }

  return target
}
