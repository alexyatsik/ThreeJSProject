uniform sampler2D globeTexture;
varying vec2 vertexUV;

void main() {
    texture2D(globeTexture, vertexUV);
    gl_FragColor = texture2D(globeTexture, vertexUV);
}