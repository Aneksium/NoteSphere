// Base64 encryption
export default class Encryptor {
    public static encrypt(str: string): string {
        return Buffer.from(str).toString('base64').replace(/\//g, '_').replace(/\+/g, "-")
    }

    public static decrypt(str: string): string {
        return Buffer.from(str.replace(/\//g, '_').replace(/\+/g, '-'), 'base64').toString()
    }
}