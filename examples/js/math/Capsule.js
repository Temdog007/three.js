/**
 * @author Temdog007 / http://github.com/Temdog007
 */

 THREE.Capsule = function(sphere1, sphere2, precision)
 {
    this.sphere1 = (sphere1 !== undefined) ? sphere1 : new THREE.Sphere();
    this.sphere2 = (sphere2 !== undefined) ? sphere2 : new THREE.Sphere();
    this.precision = (precision !== undefined) ? precision : 0.25;
 }

 Object.assign(THREE.Capsule.prototype, {
    set : function(sphere1, sphere2, precision)
    {
        this.sphere1.copy(sphere1);
        this.sphere2.copy(sphere2);
        this.precision = precision;
        return this;
    },

    clone: function(){
        return new this.constructor().copy(this);
    },

    copy: function(capsule)
    {
        this.sphere1.copy(capsule.sphere1);
        this.sphere2.copy(capsule.sphere2);
        this.precision = capsule.precision;
        return this;
    },

    empty: function()
    {
        return (this.sphere1.empty() || this.spehre2.empty());
    },

    anySphere: function(){
        var sphere = new THREE.Sphere();

        return function anySphere(action)
        {
            var sphere1 = this.sphere1;
            var sphere2 = this.sphere2;
            var precision = this.precision;
            for(var i = 0; i <= 1; i += precision)
            {
                sphere.center.lerpVectors(sphere1.center, sphere2.center, i);
                sphere.radius += sphere1.radius + (sphere2.radius - sphere1.radius) * i;

                if(action(sphere) === true)
                {
                    return true;
                }
            }
            return false;
        }
    }(),

    forEachSphere: function(){
        var sphere = new THREE.Sphere();

        return function forEachSphere(action)
        {
            var results = [];
            var sphere1 = this.sphere1;
            var sphere2 = this.sphere2;
            var precision = this.precision;
            for(var i = 0; i <= 1; i += precision)
            {
                sphere.center.lerpVectors(sphere1.center, sphere2.center, i);
                sphere.radius += sphere1.radius + (sphere2.radius - sphere1.radius) * i;

                results.push(action(sphere));
            }
            return results;
        }
    }(),

    containsPoint: function(point){
        function containsPoint(sphere)
        {
            return sphere.containsPoint(point);
        }
        return this.anySphere(containsPoint);
    },

    distanceToPoint: function(point){
        function distanceToPoint(sphere)
        {
            return sphere.distanceToPoint(point);
        }
        return Math.min.apply(null, this.forEachSphere(distanceToPoint));
    },

    intersectsSphere: function(sphere){
        function intersectsSphere(s)
        {
            return sphere.intersectsSphere(s);
        }
        return this.anySphere(intersectsSphere);
    },

    intersectsBox: function(box){
        function intersectsBox(sphere){
            return box.intersectsBox(sphere)
        }
        return this.anySphere(intersectsBox);
    },

    intersectsPlane: function(plane){
        function intersectsPlane(sphere){
            return sphere.intersectsPlane(plane);
        }
        return this.anySphere(intersectsPlane);
    },

    getBoundingBox: function(target){
        if ( target === undefined ) {

			console.warn( 'THREE.Capsule: .getBoundingBox() target is required' );
			target = new THREE.Box3();

		}

        var sphere1 = this.sphere1;
        var sphere2 = this.sphere2;
		target.set( sphere1.center, sphere2.center );
        target.expandByScalar( sphere1.center.distanceTo(sphere2.center) - (sphere1.radius + sphere2.radius) );

        return target;
    },
    
    getBoundingSphere: function(target){
        if ( target === undefined ) {

			console.warn( 'THREE.Capsule: .getBoundingSphere() target is required' );
			target = new THREE.Sphere();

		}

        var sphere1 = this.sphere1;
        var sphere2 = this.sphere2;

        target.center.lerpVectors(sphere1.center, sphere2.center, 0.5);
        target.radius =  sphere1.center.distanceTo(sphere2.center) + (sphere1.radius + sphere2.radius) ;

        return target;
    },

    applyMatrix4: function(matrix){
        this.spehre1.applyMatrix4(matrix);
        this.spehre2.applyMatrix4(matrix);
        return this;
    },

    translate: function(offset){
        this.spehre1.translate(offset);
        this.sphere2.translate(offset);

        return this;
    },

    equals: function(capsule){
        return capsule.sphere1.equals(this.sphere1) && capsule.sphere2.equals(this.sphere2);
    }
 });