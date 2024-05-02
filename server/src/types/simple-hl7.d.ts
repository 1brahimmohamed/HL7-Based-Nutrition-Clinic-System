declare module 'simple-hl7' {
    interface hl7 {
        server: {
            createTcpClient: (host: string, port: number) => any;
        }
    }

    const hl7: hl7;
    export default hl7;
}
