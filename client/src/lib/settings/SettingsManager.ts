import type {
  Setter,
  Settings,
  SettingsCombinedValue,
  SettingsKey,
} from '@slink/lib/settings/Settings.types';
import { SettingsMap } from '@slink/lib/settings/SettingsMap';
import { ThemeSetter } from '@slink/lib/settings/setters/theme';

import { browser } from '$app/environment';
import { type Writable, writable } from 'svelte/store';

import { useWritable } from '@slink/store/contextAwareStore';

import { cookie } from '@slink/utils/http/cookie';

export class SettingsManager {
  private static _instance: SettingsManager;
  public static get instance(): SettingsManager {
    if (!SettingsManager._instance) {
      SettingsManager._instance = new SettingsManager();
    }
    return SettingsManager._instance;
  }

  private _settings: SettingsMap = new SettingsMap();

  private _setters: Record<SettingsKey, Setter<SettingsKey, any>> = {
    theme: ThemeSetter,
  };

  public get<T extends SettingsKey>(
    key: T,
    defaultValue?: any | undefined
  ): SettingsCombinedValue<T> {
    if (!this._settings.has(key)) {
      return this._fallback(key, defaultValue);
    }

    return this._formReturnValue(this._settings.get(key) as Settings[T]);
  }

  public set<T extends SettingsKey>(key: T, value: any): void {
    this._setValue(key, value);
    cookie.set(key, value);
  }

  public getSettingKeys(): SettingsKey[] {
    return this._settings.keys();
  }

  private _formReturnValue<T extends SettingsKey>(
    data: Settings[T]
  ): SettingsCombinedValue<T> {
    const { value, ...rest }: any = data;

    if (!value) {
      return rest as SettingsCombinedValue<T>;
    }

    return {
      ...rest,
      subscribe: value.subscribe,
    };
  }

  private _fallback<T extends SettingsKey>(
    key: T,
    defaultValue: any
  ): SettingsCombinedValue<T> {
    if (browser) {
      this._setValue(key, cookie.get(key, defaultValue));
      return this._formReturnValue(this._settings.get(key) as Settings[T]);
    }

    const oneTimeStoreValue = writable(defaultValue);
    return this._formReturnValue(this._apply(key, oneTimeStoreValue));
  }

  private _setValue<T extends SettingsKey>(key: T, value: any): void {
    let { value: store } = this._settings.get(key) || {};

    if (!store) {
      store = useWritable(key, value);
      const initialStore = this._apply(key, store);
      this._settings.set(key, initialStore);
    } else {
      store.set(value);
    }
  }

  private _apply<K extends SettingsKey, T>(
    key: K,
    store: Writable<T>
  ): Settings[K] {
    if (!this._setters[key]) {
      return store as unknown as Settings[K];
    }

    return this._setters[key](store);
  }
}
