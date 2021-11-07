// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
// Fix svg import
declare module "*.svg" {
    const content: any;
    export default content;
}