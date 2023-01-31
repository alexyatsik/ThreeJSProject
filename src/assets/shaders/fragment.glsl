uniform sampler2D globalTexture;

void main() {
    texture2D(globalTexture);
    gl_FragColor = vec4(1, 0, 0, 1);
}