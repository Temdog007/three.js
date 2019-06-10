import { SphericalHarmonics3 } from '../math/SphericalHarmonics3.js';
import { Light } from './Light.js';

export class LightProbe extends Light {
	constructor(sh?: SphericalHarmonics3, intensity?: number);
	isLightProbe: true;
}
