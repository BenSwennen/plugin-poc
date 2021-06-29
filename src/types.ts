
export interface SkedifyCustomer {
  company: string;
  customer_number: string;
  email: string;
  external_id: string;
  first_name: string;
  is_existing: boolean;
  language: string;
  last_name: string;
  phone_number: string;
  timezone: string;
  location?: string;
}

interface SkedifyAppointment {
  readonly id: string;
  readonly location: {
    readonly id: string;
  };
  subject: {
    readonly id: string;
    readonly category_id: string;
  };
  meta: {
    get(key: string, defaultValue: any): any;
    set(key: string, value: any): void;
    remove(key: string): void;
  };
}

enum Event {
  /* --- EVENT TYPES --- */
  EVENT_INIT = 'EVENT_INIT',
  EVENT_CREATION = 'EVENT_CREATION',
  EVENT_MISCONFIGURED = 'EVENT_MISCONFIGURED',
  EVENT_ERROR = 'EVENT_ERROR',
  EVENT_APPOINTMENT_CREATED = 'EVENT_APPOINTMENT_CREATED',
  EVENT_APPOINTMENT_EDITED = 'EVENT_APPOINTMENT_EDITED',
  EVENT_APPOINTMENT_CANCELLED = 'EVENT_APPOINTMENT_CANCELLED',

  /* --- EVENT SUBTYPES --- */
  /* --- Misconfiguration --- */
  MISCONFIGURED_SUBJECT_ID = 'MISCONFIGURED_SUBJECT_ID',
  MISCONFIGURED_LOCATION_ID = 'MISCONFIGURED_LOCATION_ID',
  MISCONFIGURED_RESOURCE_CODE = 'MISCONFIGURED_RESOURCE_CODE',
  MISCONFIGURED_CLIENT_ID = 'MISCONFIGURED_CLIENT_ID',
  MISCONFIGURED_INTENT_WITHOUT_RESOURCE_CODE = 'MISCONFIGURED_INTENT_WITHOUT_RESOURCE_CODE',

  /* --- Error sub types --- */
  ERROR_API_DOWN = 'ERROR_API_DOWN',

  /* --- INTENTS --- */
  INTENT_SCHEDULE = 'INTENT_SCHEDULE',
  INTENT_RESCHEDULE = 'INTENT_RESCHEDULE',
  INTENT_INVITE = 'INTENT_INVITE',
  INTENT_EDIT = 'INTENT_EDIT',
  INTENT_CANCEL = 'INTENT_CANCEL',
}

type Events = Record<Event, string>;

export interface SkedifyConfigAddress {
  formatted_address: string;
  geolocation: string;
  street_1: string;
  postal_code: string;
  city: string;
  country: string;
  state: string;
}

export interface SkedifyConfig {
  'oauth.client': string;
  location?: SkedifyConfigAddress;
  'oauth.resource_code'?: string;
  'customer.timezone'?: string;
  'customer.first_name'?: string;
  'customer.last_name'?: string;
  'customer.email'?: string;
  'customer.phone_number'?: string;
  'appointment.subject_id'?: string;
  'appointment.location_id'?: string;
  meeting_types?: string;
  external_subject_id?: string;
  external_location_id?: string;
  'hints.intent'?: 'schedule' | 'reschedule' | 'invite' | 'edit' | 'cancel';
  'hints.contacts'?: string;
  'hints.external_employee_ids'?: string;
  language?: string;
  flow?: string;
}

export interface SkedifyPluginInstance {
  dispose: Function;
  addEventListener(event: string, callback: Function): void;
  readonly intention: string;
  customer: SkedifyCustomer;
  appointment: SkedifyAppointment;
}

type CallablePlugin = (
  DOMElement: HTMLElement,
  config?: SkedifyConfig,
) => SkedifyPluginInstance;

export interface Plugin extends CallablePlugin, Events {
  getInstance(index: number): SkedifyPluginInstance;
  count: number;
  version: string;
  dispose(): void;
  addEventListener(event: string, callback: Function): void;
  customer(): SkedifyCustomer;
  appointment(): SkedifyAppointment;
  hints(): Object; // TODO: Can't figure this one out from the docs.
}

export interface Skedify {
  Plugin: Plugin;
}

declare global {
  interface Window {
    Skedify: Skedify;
  }
}