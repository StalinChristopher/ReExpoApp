import { PermissionKey } from "./types";

export interface ConfiguredPermission {
  label: string;
  key: PermissionKey;
}

export const CONFIGURED_PERMISSIONS: ConfiguredPermission[] = [
  { label: "Camera", key: PermissionKey.Camera },
  { label: "Microphone", key: PermissionKey.Microphone },
  { label: "Location (When In Use)", key: PermissionKey.LocationWhenInUse },
  { label: "Photo Library", key: PermissionKey.PhotoLibrary },
  { label: "Contacts", key: PermissionKey.Contacts },
];
