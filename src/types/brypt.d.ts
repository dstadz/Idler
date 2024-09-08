declare module 'bcryptjs' {
  export function hashSync(data: string, salt: number | string): string
  export function compareSync(data: string, encrypted: string): boolean
  export function hash(data: string, salt: number | string): Promise<string>
  export function compare(data: string, encrypted: string): Promise<boolean>
}
