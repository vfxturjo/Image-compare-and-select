# Image-compare-and-select

Lets you compare images in local hard drive folders pair-wise, select one from each pair (or none/both), and copy/move them to another output folder!

# Todo:

### a feature i never thought of, but i see need now:

#### Heic converter

- 2 options:
  1. on run-time: resource expensive, works on the fly, no manual export settings/waiting time, just use some temp folder?
  2. pre-convert mode:
     - export to temp folder first
     - export to specific folder for later use.

### Performance improvement:

- preload 5-7 images for smoother work
- handle loading by somehow optimized way to not slow down the browser when scrolling/working
- unload if
  - image pair selection is done, and scrolled past it with 10 images difference
- if possible, load the images in user screen resolution, instead of full size?

### UX improvement

#### overlap + compare

stack the pair like before-after comparison, see changes by swiping mouse. This can be turned on/off with button/keyboard shortcut

- in persistent mode (when overlap+compare is kept turned on) auto swiping on entry?

#### group images by similar time

- get time using date using filename (default) or date metadata

  - if getting from filename, let user set the image name structure, like: <br>
    `YYYYMMDD_hhmmss`: capital letters for date, small for time, or <br>
    `NNNNNNNN_IIIIII`: Capital N for unknown date, Capital I for unknown time

- calculate difference in time

  - if difference is less than certain threshold, they are in same group
  - if difference is medium, compare the image visually to see how much different.
  - if difference is higher, they are differnt

#### more export options

- **export none or both**

- **blending images**: user will be able to export a new image, by blending the images. for example, 20% original + 80% enhanced.

#### Fixed bottom bar with information of hovering item

- this will reduce the need of using popups. also it will be a practice work

#### Side mini gallery view:

- mini thumbails
- show grouped items closer, other items a bit seperated
- scroll smoothly
- like the vscode scroll view
