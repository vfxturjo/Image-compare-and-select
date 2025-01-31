# Image-compare-and-select

Lets you compare images in local hard drive folders pair-wise, select one from each pair (or none/both), and copy/move them to another output folder!
live at: https://vfxturjo.github.io/Image-compare-and-select/

# How and Why:

I sometimes use AI to enhance images in bulk. Sometimes the AI spits out a better image, sometimes I feel like the original was better. So, I was looking for comparing images pair-wise from two separate directories. As I couldn't find any, I made this app. As it is still in its first development phase, only the main features are working. I will add more features and refine the UX when I get more time.

Open the web app, select two directories where images exist with the same name. I name the first one "Original" and the second one "Enhanced” and choose my folders accordingly. Sometimes there are HEIC files from a camera which cannot be easily loaded in web apps, so you will get an option to convert them if you want.
The app will only show pairs. If other files exist in the folders, it will simply ignore them.
I select the "Enhanced" one as the default selection, as most of the time I go with the AI-corrected one, and only sometimes prefer the original one.
Then, in the comparing page, you can use these shortcuts:

- Numpad 6 or Space: Show next pair
- Numpad 4: Show previous pair
- Numpad 1 or key A: Select left and show next pair
- Numpad 3 or key D: Select right and show next pair
- Numpad Minus: Select none

Btw, you can change the top thumbnail size in view settings popup, available from top bar.

After selection, you can open export option from the top bar, and choose to copy/move the selected items to another folder.

Enjoy!

---

---

ignore the following area...

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
- optimize the converter. reduce JS->C->JS roundtrips

### UX improvement

#### Add a visual indicator of the selected item 

When using the "select side and show next" options, it may not be immediately clear which side is selected. Adding a visual indicator, such as a simple icon that flashes on the selected side, along with a flashing selection counter in the top bar, would improve the user experience.

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

#### More export options

- **export none or both**

- **blending images**: user will be able to export a new image, by blending the images. for example, 20% original + 80% enhanced.

#### Fixed bottom bar with information of hovering item

- this will reduce the need of using popups. also it will be a practice work

#### Side mini gallery view:

- mini thumbnails
- show grouped items closer, other items a bit separated
- scroll smoothly
- like the vs code scroll view

#### Let users change the keybindings:

- create a mini info popup at the bottom to show the shortcuts
- it will have a button to open keybindings modal/drawer
- there will be 2 buttons bindable per option
