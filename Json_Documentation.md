# GUI Objects Documentation

This document contains descriptions of unique object types found in GUI configuration JSON files.

## General Parameters

### Basic Positioning Parameters
- **x, y** - object coordinates on screen (number)
- **dx, dy** - additional coordinate offsets (number)
- **anchor** - object anchor point (0.0-1.0, where 0.5 is center)

### Scaling Parameters
- **scale** - overall object scale (number)
- **scaleX, scaleY** - scale along X and Y axes separately (number)
- **rotate** - rotation angle in degrees (number)

### Adaptive Parameters (for different screen sizes)
- **v_x, v_y** - Mobile adaptive coordinates (number)
- **v_scale, v_scaleX, v_scaleY** - Mobile adaptive scale (number)
- **v_sdx, v_sdy** - Mobile adaptive offsets (number)
- **v_width, v_height** - Mobile adaptive dimensions (number)
- **v_fontSize** - Mobile adaptive font size (number or string)
- **max_scale, max_scale_x, max_scale_y** - maximum object size increase from screen size changes
- **max_scale_limit, max_scale_limit_dx, max_scale_limit_dy** - screen size increase values from default game size (limit on dx dy values up to which scale will increase)
- **limit_max_x, limit_max_y, limit_min_x, limit_min_y** - maximum and minimum object coordinates to which it will move during adaptation
- **left_limit, right_limit, top_limit, bottom_limit** - values for how far the object can move away from screen edges

### General Properties
- **type** - object type (string, required)
- **name** - unique object name (string, required)
- **debug** - debug mode (0 or 1)
- **deepPosition** - deep positioning (true/false)
- **noCheckSize** - don't check dimensions (true/false)
- **alpha** - transparency (0.0-1.0)
- **tint** - tinting color (hex code)
- **tintingOff** - disable tinting (true/false)
- **active** - object activity (true/false)

### Localization Parameters
- **loc** - localization object with language codes
- **language** - current language
- **locConfig** - localization configuration for different languages
- **format** - text formatting (true/false)
- **pos_dy** - vertical offset for localization (number)

### General Parameters
- **debug** - enable debug mode for the object with the ability to configure the object in the game (see console output)
- **active** - ignoring object when creating elements (true/false)
- **format** - auto offset for object by "y" parameter.
- **pos_dy** - direct offset in px from previous child
- **deepPosition** - in case of screen size change (size update trigger), this parameter allows the traversal algorithm to go inside and check children
- **noCheckSize** - in case of screen size change (size update trigger) parameter completely prohibits processing the object and its children

## Object Types

### 1. rect

**Description:** Rectangle with color and transparency. Used for creating background elements, frames, and colored blocks.

**Parameters:**
- **width, height** - rectangle dimensions (number)
- **color** - fill color (hex code)
- **alpha** - transparency (0.0-1.0)

```json
{
    "x": 0,
    "y": 0,
    "scale": 1.0,
    "scaleX": 1.0,
    "scaleY": 1.0,
    "v_x": 0,
    "v_y": 0,
    "v_scaleX": 1.0,
    "v_scaleY": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "width": 100,
    "height": 100,
    "color": "0x000000",
    "alpha": 1,
    "type": "rect",
    "name": "r_",
    "debug": 0
}
```

### 2. sprite

**Description:** Sprite with texture. Main element for displaying images, icons, and graphical elements.

**Parameters:**
- **texture** - texture name (string)
- **v_texture** - Mobile adaptive texture (string)
- **isMask** - whether object is a mask (true/false)
- **masked** - name of object being masked (string)
- **loc** - language for localized textures (string)

```json
{
    "x": 0,
    "y": 0,
    "anchor": 0.5,
    "scale": 1.0,
    "scaleX": 1.0,
    "scaleY": 1.0,
    "rotate": 0,
    "tint": "0xFFFFFF",
    "isMask": true,
    "masked": "",
    "v_texture": "",
    "v_scale": 1.0,
    "v_scaleX": 1.0,
    "v_scaleY": 1.0,
    "format": true,
    "pos_dy": 0,
    "loc": {
        "wild_eng": ["eng", "gb", "can"],
        "wild_deu": ["deu"],
        "wild_esp": ["esp"],
        "wild_fra": ["fra"],
        "wild_gre": ["gre"],
        "wild_hin": ["hin"],
        "wild_ind": ["ind"],
        "wild_ita": ["ita"],
        "wild_jpn": ["jpn"],
        "wild_kor": ["kor"],
        "wild_nor": ["nor"],
        "wild_pol": ["pol"],
        "wild_prt": ["prt"],
        "wild_ron": ["ron"],
        "wild_rus": ["rus"],
        "wild_swe": ["swe"],
        "wild_tha": ["tha"],
        "wild_tur": ["tur"],
        "wild_ukr": ["ukr"],
        "wild_vie": ["vie"],
        "wild_zh_cn": ["zh_cn"],
        "wild_zh_tw": ["zh_tw"]
    },
    "deepPosition": false,
    "noCheckSize": true,
    "type": "sprite",
    "texture": "",
    "name": "s_",
    "debug": 0
}
```

### 3. container

**Description:** Container for grouping objects. Used for interface organization, grouping related elements, and creating complex compositions.

**Parameters:**
- **entities** - array of child objects (array)
- **interactiveChildren** - whether child objects can be interactive (true/false)
- **centered** - whether to center the container (true/false)
- **cacheAsBitmap** - cache as bitmap (true/false)
- **alignContainer, align** - alignment objects

```json
{
    "x": 0,
    "y": 0,
    "scale": 1.0,
    "v_x": 0,
    "v_y": 0,
    "v_scale": 1.0,
    "v_scaleX": 1.0,
    "v_scaleY": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "deepPosition": false,
    "noCheckSize": true,
    "interactiveChildren": true,
    "centered": false,
    "cacheAsBitmap": false,
    "alpha": 1,
    "format": true,
    "pos_dy": 0,
    "alignContainer": {"x": 0.5, "y": 0, "!rect": {"width": 10, "height": 10}, "edit": false},
    "align": {"x": 0.5, "y": 0.5, "rect": {"width": 500, "height": 100}, "edit": false, "-autoUpdate": true},
    "type": "container",
    "name": "c_",
    "debug": 0,
    "entities": []
}
```

### 4. button

**Description:** Button with different states (normal, hovered, pressed, blocked). Main interactive interface element.

**Parameters:**
- **out, over, down, block** - textures for different button states (string)
- **soundOver** - sound on hover (string)
- **oneClick** - whether to allow only one click (true/false)
- **overScale, downScale** - scale on hover/press (number)
- **m_overScale, m_downScale** - mobile scale (number)
- **blockAlpha** - transparency of blocked button (number)
- **states** - object with different button states
- **label** - text object for button label
- **hintAreaRect** - hint area

```json
{
    "x": 0,
    "y": 0,
    "dx": 0,
    "dy": 0,
    "scale": 1.0,
    "v_x": 0,
    "v_y": 0,
    "v_scale": 1.0,
    "v_scaleX": 1.0,
    "v_scaleY": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "deepPosition": false,
    "noCheckSize": true,
    "out": "_0",
    "over": "_1",
    "down": "_2",
    "block": "_3",
    "soundOver": "btn_over",
    "oneClick": true,
    "type": "button",
    "name": "b_",
    "debug": 0,
    "overScale": 0.9,
    "downScale": 0.8,
    "blockAlpha": 0.9,
    "m_overScale": 1.0,
    "m_downScale": 1.0,
    "states": {
        "on": {
            "out": "check_box_on"
        },
        "off": {
            "out": "check_box_off",
            "block": "check_box_off_disable"
        }
    },
    "-soundUp": "sound_up",
    "-soundOver": "sound_over",
    "activeStateList": [],
    "noActiveStateList": [],
    "alwaysAvailable": false,
    "label": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 40,
        "align": "center",
        "alignV": "middle",
        "font": {"size": 40, "name": "ui_font"},
        "checkFontSize": true,
        "oneLine": true,
        "type": "textBitmap",
        "text": "RED",
        "debug": 0
    },
    "hintAreaRect": {"x": 0, "y": 0, "width": 10, "height": 10, "type": 0, "debug": 0}
}
```

### 5. buttonMobile

**Description:** Mobile button with additional parameters for touch screens. Has extended settings for mobile devices.

**Parameters:**
- **curacao_x, v_curacao_x** - special coordinates for mobile devices (number)
- **outTintColor, overTintColor, downTintColor, blockTintColor** - tint colors for different states (hex code)
- **overScale, downScale** - scale for mobile devices (number)
- **blockAlpha** - transparency of the blocked button (number)
- **label** - text object for the button label
- **hintAreaRect** - hint area

```json
{
    "x": 0,
    "y": 0,
    "dx": 0,
    "dy": 0,
    "scale": 1.0,
    "scaleX": 1.0,
    "scaleY": 1.0,
    "anchor": 0.5,
    "v_x": 0,
    "v_y": 0,
    "v_scale": 1.0,
    "v_scaleX": 1.0,
    "v_scaleY": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "curacao_x": 0,
    "v_curacao_x": 0,
    "out": "_0",
    "over": "_1",
    "down": "_2",
    "block": "_3",
    "soundOver": "btn_over",
    "oneClick": true,
    "type": "buttonMobile",
    "name": "b_",
    "debug": 0,
    "overScale": 1.04,
    "downScale": 0.95,
    "blockAlpha": 0.6,
    "outTintColor": "0xFFFFFF",
    "overTintColor": "0xCACACA",
    "downTintColor": "0xCACACA",
    "blockTintColor": "0x999999",
    "m_overScale": 1.0,
    "m_downScale": 1.0,
    "states": {
        "on": {
            "out": "check_box_on"
        },
        "off": {
            "out": "check_box_off",
            "block": "check_box_off_disable"
        }
    },
    "-soundUp": "sound_up",
    "-soundOver": "sound_over",
    "activeStateList": [],
    "noActiveStateList": [],
    "alwaysAvailable": false,
    "label": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 40,
        "align": "center",
        "alignV": "middle",
        "font": {"size": 40, "name": "ui_font"},
        "checkFontSize": true,
        "oneLine": true,
        "type": "textBitmap",
        "text": "RED",
        "debug": 0
    },
    "hintAreaRect": {"x": 0, "y": 0, "width": 10, "height": 10, "type": 0, "debug": 0}
}
```

### 6. textBitmap

**Description:** Text object with bitmap font. Used for displaying text with pre-generated fonts for better performance.

**Parameters:**
- **text** - text to display (string)
- **font** - object with font settings (size, name)
- **fill** - text color (hex code)
- **align, alignV** - horizontal and vertical alignment (string)
- **letterSpacing** - distance between characters (number)
- **oneLine** - whether to display in one line (true/false)
- **toUpperCase** - whether to convert to uppercase (true/false)
- **checkFontSize, forceCheckFontSize, fullCheckFontSize** - font size check settings
- **splitInsideObj, splitDx, splitVector, splitObj** - text splitting parameters
- **firstText** - initial text (string)
- **fontWeight** - font weight (string)
- **textBreak** - whether to allow text wrapping (true/false)
- **hin** - object with advanced font settings
- **locCheck** - whether to check localization (true/false)
- **locConfig** - localization configuration for different languages
- **v_locConst** - Mobile adaptive localization constant (string)
- **numberFormat** - whether to format as a number (true/false)

```json
{
    "x": 0,
    "y": 0,
    "scale": 1.0,
    "v_x": 0,
    "v_y": 0,
    "v_width": 300,
    "v_height": 40,
    "v_fontSize": 40,
    "v_scale": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "deepPosition": false,
    "noCheckSize": true,
    "splitInsideObj": "",
    "splitDx": 8,
    "splitVector": 1,
    "splitObj": "",
    "firstText": " - ",
    "align": "center",
    "alignV": "middle",
    "fontWeight": "bolder",
    "tint": "0xFFFFFF",
    "format": true,
    "pos_dy": 0,
    "textBreak": true,
    "hin": {
        "x": 0,
        "y": 0,
        "width": 700,
        "height": 40,
        "align": "center",
        "alignV": "middle",
        "lineJoin": "round",
        "fontSize": "25px",
        "fontName": "Mangal",
        "fill": "0xffffff",
        "letterSpacing": 0,
        "leading": 0,
        "checkFontSize": false,
        "oneLine": true,
        "toUpperCase": false,
        "padding": 10,
        "dropShadow": true,
        "dropShadowAngle": 1.9,
        "dropShadowBlur": 4,
        "dropShadowDistance": 2,
        "dropShadowColor": "#4e8b10",
        "fillGradientStops": [0.2, 0.6, 1],
        "fontFamily": "mangal",
        "miterLimit": 0,
        "stroke": "#240000",
        "strokeThickness": 4,
        "type": "textFont",
        "debug": 0
    },
    "checkFontSize": true,
    "forceCheckFontSize": true,
    "fullCheckFontSize": false,
    "locCheck": true,
    "locConfig": {
        "-jpn": {"fontSize": 15},
        "ron": {"fontSize": 38},
        "zh_cn": {"fontSize": 30},
        "zh_tw": {"fontSize": 30},
        "kor": {"fontSize": 30},
        "pol": {"fontSize": 35},
        "jpn": {"fontSize": 35},
        "vie": {"dy": -0.15},
        "gre": {"dy": -0.15, "v_fontSize": 28},
        "tha": {"dy": -0.05},
        "kor": {"dy": -0.1},
        "zh_cn": {"dy": -0.1},
        "zh_tw": {"dy": -0.1},
        "jpn": {"dy": -0.1}
    },
    "v_locConst": "",
    "width": 300,
    "height": 40,
    "numberFormat": true,
    "font": {"size": 40, "name": "ui_font"},
    "fill": "0x000001",
    "letterSpacing": 0,
    "oneLine": true,
    "toUpperCase": false,
    "-textBreak": true,
    "text/locConst": "",
    "type": "textBitmap",
    "name": "t_",
    "debug": 0
}
```

### 7. textNumberBitmap

**Description:** Text object specifically for displaying numbers. Optimized for numeric values with bitmap fonts.

**Parameters:**
- **text** - numeric value to display (string or number)
- **font** - object with font settings (size, name)
- **align, alignV** - horizontal and vertical alignment (string)
- **checkFontSize** - whether to check font size (true/false)
- **oneLine** - whether to display in one line (true/false)

```json
{
    "x": 0,
    "y": 0,
    "scale": 1.0,
    "v_x": 0,
    "v_y": 0,
    "v_width": 300,
    "v_height": 40,
    "v_fontSize": 40,
    "v_scale": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "width": 300,
    "height": 40,
    "align": "center",
    "alignV": "middle",
    "font": {"size": 40, "name": "ui_font"},
    "checkFontSize": true,
    "oneLine": true,
    "text": "0",
    "type": "textNumberBitmap",
    "name": "t_",
    "debug": 0
}
```

### 8. textFont

**Description:** Text object with system font. Uses system fonts instead of bitmap fonts for flexibility.

**Parameters:**
- **text** - text to display (string)
- **fontSize** - font size (string with px)
- **fontName** - font name (string)
- **fill** - text color (hex code)
- **align, alignV** - horizontal and vertical alignment (string)
- **letterSpacing** - distance between characters (number)
- **leading** - line spacing (number)
- **checkFontSize** - whether to check font size (true/false)
- **oneLine** - whether to display in one line (true/false)
- **toUpperCase** - whether to convert to uppercase (true/false)
- **locCheck** - whether to check localization (true/false)

```json
{
    "x": 0,
    "y": 0,
    "scale": 1.0,
    "v_x": 0,
    "v_y": 0,
    "v_width": 300,
    "v_height": 40,
    "v_fontSize": "28px",
    "v_scale": 1.0,
    "v_sdx": 0.0,
    "v_sdy": 0.0,
    "deepPosition": false,
    "noCheckSize": true,
    "width": 300,
    "height": 40,
    "align": "center",
    "alignV": "middle",
    "fontSize": "28px",
    "fontName": "fontName",
    "fill": "0x000001",
    "letterSpacing": 0,
    "leading": 0,
    "checkFontSize": true,
    "oneLine": true,
    "toUpperCase": false,
    "locCheck": true,
    "text/locConst": "",
    "type": "textFont",
    "name": "t_",
    "debug": 0
}
```

### 9. textFontInput

**Description:** Text input field for user input. Supports different states (normal, focused, locked).

**Parameters:**
- **text** - initial text (string)
- **maxLength** - maximum text length (number)
- **placeholder** - placeholder text (string)
- **restrict** - character restriction (string)
- **substituteText** - whether to replace text (true/false)
- **input** - object with input field settings (font, size, padding, color)
- **box** - object with frame settings for different states

```json
{
    "x": 14,
    "y": 130,
    "deepPosition": false,
    "noCheckSize": true,
    "width": 300,
    "height": 40,
    "align": "center",
    "alignV": "top",
    "toUpperCase": false,
    "!maxLength": -1,
    "!placeholder": "",
    "!restrict": "",
    "text": "",
    "type": "textFontInput",
    "name": "t_input_",
    "debug": 0,
    "!substituteText": false,
    "input": {
        "fontFamily": "BebasFont",
        "fontSize": "19px",
        "padding": "10px",
        "width": "300px",
        "color": "#000000"
    },
    "box": {
        "default": {"fill": "0xE8E9F3", "rounded": 12, "stroke": {"color": "0xCBCEE0", "width": 3}},
        "focused": {"fill": "0xE1E3EE", "rounded": 12, "stroke": {"color": "0xABAFC6", "width": 3}},
        "disabled": {"fill": "0xDBDBDB", "rounded": 12}
    }
}
```

### 10. textMultiStyleFont

**Description:** Text object with multiple styles. Allows applying different styles to different parts of text.

**Parameters:**
- **default** - object with default font settings (fontFamily, fontSize, fill)
- **style** - object with additional styles (fill)
- **letterSpacing** - spacing between characters (number)
- **locCheck** - whether to check localization (true/false)

```json
{
    "x": 0,
    "y": 0,
    "width": 300,
    "height": 40,
    "align": "center",
    "alignV": "middle",
    "letterSpacing": 0,
    "locCheck": true,
    "default": {
        "fontFamily": "fontName",
        "fontSize": "15px",
        "fill": "0xFFFF00"
    },
    "style": {"fill": "0xffffff"},
    "type": "textMultiStyleFont",
    "name": "t_",
    "debug": 0
}
```

### 11. actor

**Description:** Animation object for playing frame sequences. Used for simple sprite-based animations.

**Parameters:**
- **fps** - frames per second (number)
- **speed** - playback speed (number)
- **play** - whether to play automatically (true/false)
- **playLoop** - whether to loop the animation (true/false)
- **totalLoop** - number of loops (number, 0 = infinite)
- **nameAnimation** - animation name (string)
- **active** - whether the object is active (true/false)

```json
{
    "x": 0,
    "y": 0,
    "dx": 0,
    "dy": 0,
    "anchor": 0.5,
    "deepPosition": false,
    "noCheckSize": true,
    "fps": 30,
    "speed": 1,
    "play": false,
    "playLoop": false,
    "totalLoop": 0,
    "nameAnimation": "",
    "name": "a_",
    "type": "actor",
    "debug": 0
}
```

### 12. actorSpine

**Description:** Spine animation object for playing complex animations based on Spine framework. Supports skeletal animations with bones and meshes.

**Parameters:**
- **speed** - playback speed (number)
- **play** - whether to play automatically (true/false)
- **playLoop** - whether to loop the animation (true/false)
- **destroyOnKill** - whether to destroy on completion (true/false)
- **textures** - texture name (string)
- **custom_a_name** - custom animation name (string)
- **skin** - skin name (string)
- **idle, win** - animation names for different states (string)
- **a_start, a_idle, a_collect** - animation names for different actions (string)
- **start, Y_start, R_start, T_start** - start animation names for different types (string)
- **Y_idle, R_idle, T_idle** - wait animation names for different types (string)

```json
{
    "x": 0,
    "y": 0,
    "dx": 0,
    "dy": 0,
    "speed": 1,
    "deepPosition": false,
    "noCheckSize": true,
    "play": false,
    "playLoop": false,
    "destroyOnKill": true,
    "textures": "",
    "custom_a_name": "animation",
    "skin": "",
    "idle": "idle",
    "win": "win",
    "a_start": "start",
    "a_idle": "static",
    "a_collect": "collect",
    "start": "appear_coins",
    "Y_start": "mini_start",
    "Y_idle": "mini_idle",
    "R_start": "minor_start",
    "R_idle": "minor_idle",
    "T_start": "major_start",
    "T_idle": "major_idle",
    "name": "a_",
    "type": "actorSpine",
    "debug": 0
}
```

### 13. neutrinoParticles

**Description:** Neutrino particle system for creating complex particle effects. Supports high performance and complex configurations.

**Parameters:**
- **baseParent** - whether it is the base parent object (true/false)
- **removeOnEnd** - whether to remove on completion (true/false)
- **killOnEnd** - whether to kill on completion (true/false)
- **loop** - whether to loop the system (true/false)
- **maxParticles** - maximum number of particles (number)
- **properties** - particle properties (object or null)
- **batchSize** - batch size for rendering (number)
- **autoResize** - whether to automatically resize (true/false)
- **config** - particle configuration object (particle_name, position, rotation, scale, pause, generatorsPaused)
- **add_particles** - array of additional particles

```json
{
    "x": 0,
    "y": 0,
    "deepPosition": false,
    "noCheckSize": true,
    "baseParent": true,
    "removeOnEnd": true,
    "killOnEnd": true,
    "loop": true,
    "maxParticles": 1500,
    "properties": null,
    "batchSize": 16384,
    "autoResize": false,
    "config": {
        "particle_name": "Particls_Fugaso",
        "position": [0, 0, 0],
        "rotation": 0,
        "scale": [1, 1, 1],
        "pause": false,
        "generatorsPaused": false
    },
    "add_particles": [
        {
            "particle_name": "",
            "position": [0, 0, 0],
            "rotation": 0,
            "scale": [1, 1, 1],
            "pause": false,
            "generatorsPaused": false
        }
    ],
    "type": "neutrinoParticles",
    "name": "np_",
    "debug": 0
}
```

### 14. revoltEmmiter

**Description:** Revolt particle emitter for creating particle effects. Alternative particle system with its own settings.

**Parameters:**
- **autoStart** - whether to start automatically (true/false)
- **scaleMod** - scale modifier (number)
- **interactiveChildren** - whether children can be interactive (true/false)
- **revoltName** - name of the Revolt effect (string)
- **time** - emitter lifetime (number)

```json
{
    "x": 0,
    "y": 0,
    "debug": 0,
    "autoStart": true,
    "scaleMod": 1,
    "deepPosition": false,
    "noCheckSize": true,
    "name": "re_",
    "interactiveChildren": true,
    "revoltName": "FireH",
    "type": "revoltEmmiter"
}
```

### 15. revoltSequence

**Description:** Revolt sequence for creating complex particle effect sequences. Allows creating effect chains.

**Parameters:**
- **delay** - delay before starting (number)
- **autoStart** - whether to start automatically (true/false)
- **scaleMod** - scale modifier (number)
- **interactiveChildren** - whether children can be interactive (true/false)
- **revoltName** - name of the Revolt sequence (string)

```json
{
    "x": 0,
    "y": 0,
    "debug": 0,
    "delay": 0,
    "deepPosition": false,
    "noCheckSize": true,
    "autoStart": true,
    "scaleMod": 1,
    "name": "rs_",
    "interactiveChildren": true,
    "revoltName": "FireH",
    "type": "revoltSequence"
}
```

### 16. particleContainer

**Description:** Container for particles. Specialized container for organizing and managing particle systems.

**Parameters:**
- **entities** - array of child objects (array)
- **interactiveChildren** - whether children can be interactive (true/false)
- **centered** - whether to center the container (true/false)
- **cacheAsBitmap** - cache as bitmap (true/false)
- **portrait** - whether in portrait mode if true show only in mobile if false then show only in desktop devices (true/false)
- **screen_height** - screen height to adapt (array)
- **x_1280, y_1280, texture_1280** - coordinates and textures for resolution 1280
- **sdx, sdy** - offset along X and Y axes (number)

```json
{
    "x": 0,
    "y": 0,
    "deepPosition": true,
    "noCheckSize": true,
    "interactiveChildren": true,
    "centered": false,
    "cacheAsBitmap": false,
    "type": "particleContainer",
    "name": "c_",
    "debug": 0,
    "format": true,
    "pos_dy": 0,
    "v_x": 0,
    "v_y": 0,
    "v_sdx": 0,
    "v_sdy": 0,
    "portrait": false,
    "screen_height": [1280, 1300],
    "x_1280||[i]": 0,
    "y_1280||[i]": 0,
    "texture_1280||[i]": 0,
    "sdx": 0.0,
    "sdy": 0.0,
    "entities": []
}
```

### 17. particle

**Description:** Particle object for creating individual particle effects. Used for simple particle effects.

**Parameters:**
- **interactiveChildren** - whether children can be interactive (true/false)
- **emitter** - particle emitter object (type, config, texture)
- **entities** - array of children (array)

```json
{
    "x": 0,
    "y": 0,
    "deepPosition": false,
    "noCheckSize": true,
    "interactiveChildren": false,
    "type": "particle",
    "name": "op_",
    "debug": 0,
    "emitter": {
        "type": "none",
        "config": "name_json_file_config",
        "texture": "texture_name || array"
    },
    "entities": []
}
```

### 18. graphic

**Description:** Graphic object for creating simple geometric shapes and lines. Used for programmatic drawing.

**Parameters:**
- **width, height** - object dimensions (number)
- **color** - fill color (hex code)
- **alpha** - transparency (0.0-1.0)
- **typeDraw** - drawing type (number)
- **lineStyle** - line style (width, color, alpha)
- **joinObject** - object to join (line)
- **joinX, joinY** - join coordinates (number)

```json
{
    "x": 0,
    "y": 0,
    "-left": 0,
    "-top": 0,
    "width": 100,
    "height": 100,
    "-radius": 0,
    "deepPosition": false,
    "noCheckSize": true,
    "color": "0x000000",
    "alpha": 1,
    "typeDraw": 0,
    "lineStyle": {"width": 1, "color": "0x118A3D", "alpha": 1},
    "type": "graphic",
    "name": "g_",
    "debug": 0,
    "joinObject": "",
    "joinX": 0,
    "joinY": 0
}
```

### 19. slider

**Description:** Slider for selecting values in a range. Used for volume, brightness settings, etc.

**Parameters:**
- **minTargetValue, maxTargetValue** - minimum and maximum target values ​​(number)
- **minSlideValue, maxSlideValue** - minimum and maximum slider values ​​(number)
- **v_minSlideValue, v_maxSlideValue** - Mobile adaptive slider values ​​(number)
- **vertical** - whether the slider is vertical (true/false)
- **texture** - slider texture (string)
- **hintAreaRect** - hint area

```json
{
    "x": 0,
    "y": 0,
    "minTargetValue": 1,
    "maxTargetValue": 100,
    "minSlideValue": 30,
    "maxSlideValue": 445,
    "v_minSlideValue": 0,
    "v_maxSlideValue": 708,
    "vertical": false,
    "type": "slider",
    "texture": "scrollbar_handler",
    "name": "sl_",
    "debug": 0,
    "hintAreaRect": {"x": 0, "y": 0, "width": 50, "height": 50, "type": 0, "debug": 0}
}
```

### 20. checkBox

**Description:** Checkbox for yes/no selection. Used for settings and option selection.

**Parameters:**
- **out** - normal state texture (string)
- **active** - object with active state textures (out, over, down, block)
- **noActive** - object with inactive state textures (out, over, down, block)
- **activeStateList, noActiveStateList** - state lists (array)
- **alwaysAvailable** - always available (true/false)
- **label** - text object for the label
- **hintAreaRect** - hint area

```json
{
    "x": 0,
    "y": 0,
    "deepPosition": false,
    "noCheckSize": true,
    "out": "_0",
    "type": "checkBox",
    "name": "cb_",
    "debug": 0,
    "active": {
        "out": "_0",
        "over": "_1",
        "down": "_2",
        "block": "_3"
    },
    "noActive": {
        "out": "_0",
        "over": "_1",
        "down": "_2",
        "block": "_3"
    },
    "activeStateList": [],
    "noActiveStateList": [],
    "alwaysAvailable": false,
    "label": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 40,
        "align": "center",
        "alignV": "middle",
        "font": {"size": 40, "name": "ui_font"},
        "checkFontSize": true,
        "oneLine": true,
        "type": "textBitmap",
        "text": "RED",
        "debug": 0
    },
    "hintAreaRect": {"x": 0, "y": 0, "width": 10, "height": 10, "type": 0, "debug": 0}
}
```

## Special Objects

### 21. sound

**Description:** Audio file for playing audio. Used for sounds and music in the game.

**Parameters:**
- **name** - sound name (string)
- **file** - file name (string)
- **volume** - volume (0.0-1.0)
- **type** - audio type (sound or music)

```json
{
    "name": "name",
    "file": "fileName",
    "volume": 1,
    "type": "sound||music"
}
```

### 22. mask

**Description:** Mask for object. Used for clipping or hiding parts of the object.

**Parameters:**
- **mask** - mask object with coordinates, dimensions and anchor point

```json
{
    "mask": {
        "x": 0,
        "y": 0,
        "anchor": 0.5,
        "width": 705,
        "height": 345,
        "debug": 0,
        "name": "r_mask"
    }
}
```

## Resource Loaders

### 23. loadAtlas

**Description:** Texture atlas loader. Loads images with multiple textures for performance optimization.

**Parameters:**
- **loader** - loader type (loadAtlas)
- **deviceFolder** - whether to use device folder (true/false)
- **resolution** - whether to consider resolution (true/false)
- **name** - resource name (string)
- **file** - file path (string)

```json
{
    "loader": "loadAtlas",
    "deviceFolder": true,
    "resolution": true,
    "name": "Resources-0",
    "file": "Atlases/"
}
```

### 24. loadBitmapFont

**Description:** Bitmap font loader. Loads pre-generated fonts for different languages.

**Parameters:**
- **loader** - loader type (loadBitmapFont)
- **name** - font name (string)
- **file** - path to font files (string)
- **locMap** - localization map for different languages ​​(object)
- **dyMap** - vertical offset map for different languages ​​(object)
- **lineHeight** - line height for different fonts (object)

```json
{
    "loader": "loadBitmapFont",
    "name": "language_font",
    "file": "assets/font/",
    "locMap": {
        "jpn": "language_font_jpn",
        "kor": "language_font_kor",
        "tha": "language_font_tha",
        "zh_cn,zh_tw": "language_font_zh_cn"
    },
    "dyMap": {
        "gre": 0,
        "jpn": 0,
        "kor": 0,
        "pol,ron": 0,
        "tha": 0,
        "vie": 0,
        "zh_cn,zh_tw": 0
    },
    "lineHeight": {
        "menu_font_jpn": 10,
        "menu_font_zh_cn": 15,
        "menu_font_kor": 15
    }
}
```

### 25. loadImage

**Description:** Image loader. Loads individual images with support for different formats.

**Parameters:**
- **loader** - loader type (loadImage)
- **deviceFolder** - whether to use device folder (true/false)
- **name** - image name (string)
- **file** - file path (string)
- **noWebp** - whether to not use WebP format (true/false)
- **onlyForNoWebp** - array of files only for non-WebP devices (array)

```json
{
    "loader": "loadImage",
    "deviceFolder": true,
    "name": "Background_1.jpg",
    "file": "Single/",
    "noWebp": true,
    "onlyForNoWebp": [""]
}
```

### 26. loadJson

**Description:** JSON file loader. Loads configuration files and data in JSON format.

**Parameters:**
- **loader** - loader type (loadJson)
- **name** - resource name (string)
- **file** - file path (string)

```json
{
    "loader": "loadJson",
    "name": "GDGamble",
    "file": "assets/"
}
```

### 27. loadNeutrino

**Description:** Neutrino particle loader. Loads Neutrino particle system configurations.

**Parameters:**
- **loader** - loader type (loadNeutrino)
- **active** - whether the loader is active (0 or 1)
- **name** - particle system name (string)
- **file** - path to particle files (string)

```json
{
    "loader": "loadNeutrino",
    "active": 0,
    "name": "Particls_Fugaso",
    "file": "assets/particles/"
}
```

### 28. loadSpine

**Description:** Spine animation loader. Loads skeletal animations for Spine framework.

**Parameters:**
- **loader** - loader type (loadSpine)
- **name** - animation name (string)
- **file** - path to animation files (string)

```json
{
    "loader": "loadSpine",
    "name": "7",
    "file": "assets/main/Animations/Spine/"
}
```

### 29. loadAnimationAtlas

**Description:** Animation atlas loader. Loads frame sequences for sprite animations.

**Parameters:**
- **loader** - loader type (loadAnimationAtlas)
- **active** - whether the loader is active (true/false)
- **url** - base URL for loading (string)
- **pref** - filename prefix (string)
- **suf** - filename suffix (string)
- **round** - range of file numbers [start, end] (array)

```json
{
    "loader": "loadAnimationAtlas",
    "active": false,
    "url": "assets/main/Animations/",
    "pref": "effects-",
    "suf": "",
    "round": [0, 2]
}
```

## Notes

### General Principles
- All objects have basic properties: `x`, `y`, `type`, `name`, `debug`
- Many objects support `deepPosition`, `noCheckSize`
- Localization system supports multiple languages through parameters `loc`, `language`, `locConfig`

### Adaptability
- Parameters with `v_` prefix (v_x, v_y, v_scale, v_scaleX, v_scaleY, v_sdx, v_sdy, v_width, v_height, v_fontSize) are used for Mobile adaptation to different screen sizes
- These parameters are automatically applied depending on Mobile device resolution

### Text Objects
- Support extended font settings and alignment
- Have parameters for localization: `format`, `pos_dy`, `textBreak`, `tint`, `fontWeight`
- Bitmap fonts (`textBitmap`, `textNumberBitmap`) are used for better performance
- System fonts (`textFont`, `textFontInput`, `textMultiStyleFont`) provide flexibility

### Animation Objects
- `actor` - for simple sprite animations with parameters `fps`, `speed`, `play`, `playLoop`
- `actorSpine` - for complex skeletal animations with parameters `skin`, `idle`, `win`, `a_start`, `a_idle`, `a_collect`
- Support different animation states and automatic playback

### Interactive Elements
- Buttons (`button`, `buttonMobile`) have extended parameters: `states`, `soundOver`, `oneClick`, `de_active_texture`
- Checkboxes (`checkBox`) support active and inactive states
- Sliders (`slider`) allow selecting values in a range

### Particle Systems
- `neutrinoParticles` - high-performance system with complex configurations
- `revoltEmmiter`, `revoltSequence` - alternative particle systems
- `particleContainer`, `particle` - containers for organizing effects

### Containers and Organization
- `container` - basic container for grouping objects

### Resource Loaders
- Support different types of resources: textures, fonts, animations, sounds
- Have settings for different devices and resolutions
- Support localization and performance optimization

### Usage Recommendations
- Use adaptive parameters to support different devices
- Apply bitmap fonts for static text with better performance
- Use system fonts for dynamic text with localization
- Organize complex interfaces through containers
- Use masks to create complex shapes and effects
