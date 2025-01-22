import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '6px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #419bfb
		'--color-primary-50': '227 240 254', // #e3f0fe
		'--color-primary-100': '217 235 254', // #d9ebfe
		'--color-primary-200': '208 230 254', // #d0e6fe
		'--color-primary-300': '179 215 253', // #b3d7fd
		'--color-primary-400': '122 185 252', // #7ab9fc
		'--color-primary-500': '65 155 251', // #419bfb
		'--color-primary-600': '59 140 226', // #3b8ce2
		'--color-primary-700': '49 116 188', // #3174bc
		'--color-primary-800': '39 93 151', // #275d97
		'--color-primary-900': '32 76 123', // #204c7b
		// secondary | #46a09e
		'--color-secondary-50': '227 241 240', // #e3f1f0
		'--color-secondary-100': '218 236 236', // #daecec
		'--color-secondary-200': '209 231 231', // #d1e7e7
		'--color-secondary-300': '181 217 216', // #b5d9d8
		'--color-secondary-400': '126 189 187', // #7ebdbb
		'--color-secondary-500': '70 160 158', // #46a09e
		'--color-secondary-600': '63 144 142', // #3f908e
		'--color-secondary-700': '53 120 119', // #357877
		'--color-secondary-800': '42 96 95', // #2a605f
		'--color-secondary-900': '34 78 77', // #224e4d
		// tertiary | #926cf9
		'--color-tertiary-50': '239 233 254', // #efe9fe
		'--color-tertiary-100': '233 226 254', // #e9e2fe
		'--color-tertiary-200': '228 218 254', // #e4dafe
		'--color-tertiary-300': '211 196 253', // #d3c4fd
		'--color-tertiary-400': '179 152 251', // #b398fb
		'--color-tertiary-500': '146 108 249', // #926cf9
		'--color-tertiary-600': '131 97 224', // #8361e0
		'--color-tertiary-700': '110 81 187', // #6e51bb
		'--color-tertiary-800': '88 65 149', // #584195
		'--color-tertiary-900': '72 53 122', // #48357a
		// success | #47bd5b
		'--color-success-50': '227 245 230', // #e3f5e6
		'--color-success-100': '218 242 222', // #daf2de
		'--color-success-200': '209 239 214', // #d1efd6
		'--color-success-300': '181 229 189', // #b5e5bd
		'--color-success-400': '126 209 140', // #7ed18c
		'--color-success-500': '71 189 91', // #47bd5b
		'--color-success-600': '64 170 82', // #40aa52
		'--color-success-700': '53 142 68', // #358e44
		'--color-success-800': '43 113 55', // #2b7137
		'--color-success-900': '35 93 45', // #235d2d
		// warning | #bfc12f
		'--color-warning-50': '245 246 224', // #f5f6e0
		'--color-warning-100': '242 243 213', // #f2f3d5
		'--color-warning-200': '239 240 203', // #eff0cb
		'--color-warning-300': '229 230 172', // #e5e6ac
		'--color-warning-400': '210 212 109', // #d2d46d
		'--color-warning-500': '191 193 47', // #bfc12f
		'--color-warning-600': '172 174 42', // #acae2a
		'--color-warning-700': '143 145 35', // #8f9123
		'--color-warning-800': '115 116 28', // #73741c
		'--color-warning-900': '94 95 23', // #5e5f17
		// error | #a21010
		'--color-error-50': '241 219 219', // #f1dbdb
		'--color-error-100': '236 207 207', // #eccfcf
		'--color-error-200': '232 195 195', // #e8c3c3
		'--color-error-300': '218 159 159', // #da9f9f
		'--color-error-400': '190 88 88', // #be5858
		'--color-error-500': '162 16 16', // #a21010
		'--color-error-600': '146 14 14', // #920e0e
		'--color-error-700': '122 12 12', // #7a0c0c
		'--color-error-800': '97 10 10', // #610a0a
		'--color-error-900': '79 8 8', // #4f0808
		// surface | #333333
		'--color-surface-50': '224 224 224', // #e0e0e0
		'--color-surface-100': '214 214 214', // #d6d6d6
		'--color-surface-200': '204 204 204', // #cccccc
		'--color-surface-300': '173 173 173', // #adadad
		'--color-surface-400': '112 112 112', // #707070
		'--color-surface-500': '51 51 51', // #333333
		'--color-surface-600': '46 46 46', // #2e2e2e
		'--color-surface-700': '38 38 38', // #262626
		'--color-surface-800': '31 31 31', // #1f1f1f
		'--color-surface-900': '25 25 25' // #191919
	}
};
