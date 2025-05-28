export type BodyRecord<T> = Record<keyof T, string> & { id: string };

export type Header<T> = {
  label: string;
  key: keyof T;
};