import type { ConfigEnv } from 'vite';

type FSDFolders = 'app' | 'pages' | 'widgets' | 'processes' | 'shared';
export interface BuildOptions {
  env: Record<string, string>;
  command: ConfigEnv['command'];
  port: number;
  fsdPaths: Record<FSDFolders, string>;
}
