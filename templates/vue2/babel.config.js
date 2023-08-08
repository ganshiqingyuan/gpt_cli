module.exports = {
    presets: [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: '3.8',
            },
        ],
    ],
    sourceType: 'unambiguous',
    plugins: [
        // [
        // 	'component',
        // 	{
        // 		libraryName: 'element-ui',
        // 		styleLibraryName: 'theme-chalk',
        // 	},
        // ],
        '@babel/transform-runtime',
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: name => `${name}/style/less`,
            },
            'vant',
        ],
    ],
    exclude: ['./node_modules'],
};
