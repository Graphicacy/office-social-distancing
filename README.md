## Office Social Distancing Prototype

### Steps to replicate

1. Download an office floor plan as a SVG - https://www.smartdraw.com/office-floor-plan/examples/cubicle-floor-plan/
1. Open Adobe Illustrator
   1. Update art board to `width: 900 pt` and `height: 600 pt`
   1. Resize the floor plan to fit within the updated art board bounds
   1. Using the `pen` tool, draw a path throughout the office floor plan
   1. Re-name the `path` to `WayFinding` for easily finding in the SVG file
1. Copy the updated SVG to the `/src/assets/data` directory
1. Install [svgo](https://github.com/svg/svgo) to convert shapes to paths
   1. `npm install svgo --global`
   1. `svgo --pretty --config='{"full":true}' --enable=convertShapeToPath src/assets/data/<name-of-file>.svg`
1. Find the WayFinding `<path/>` in the SVG file and re-name the class name to `way__finding` so we can
   find within the code
1. Update the reference SVG in `Visualization/index.js`

```js
import { ReactComponent as OfficeFloorPlan } from '../../../assets/data/<name-of-file>.svg';
```

### Using d3-contour for density plot

<img width="925" alt="Screen Shot 2020-07-06 at 4 50 40 PM" src="https://user-images.githubusercontent.com/1707103/86641116-e542e980-bfa8-11ea-9aad-3aa4d192a2d2.png">

### Using custom markers for anonymizing individuals
