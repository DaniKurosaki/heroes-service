import { CapitalizePipe } from "./capitalize.pipe";



describe('CapitalizePipe', () => {
    let pipe: CapitalizePipe;

    beforeEach(() => {
        pipe = new CapitalizePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should capitalize the first letter of a single word', () => {
        expect(pipe.transform('hello')).toBe('Hello');
    });

    it('should capitalize the first letter of a sentence', () => {
        expect(pipe.transform('hello world')).toBe('Hello world');
    });

    it('should not change the string if the first character is already capitalized', () => {
        expect(pipe.transform('Hello')).toBe('Hello');
    });

    it('should handle empty strings', () => {
        expect(pipe.transform('')).toBe('');
    });

    it('should handle strings with only one character', () => {
        expect(pipe.transform('a')).toBe('A');
        expect(pipe.transform('A')).toBe('A');
    });

    it('should handle strings with special characters', () => {
        expect(pipe.transform('@hello')).toBe('@hello');
    });

    it('should handle strings with numbers', () => {
        expect(pipe.transform('1hello')).toBe('1hello');
    });
});