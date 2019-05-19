/**
 * @author Temdog007 / http://github.com/Temdog007
 */

THREE.CapsuleGeometry = function(capsule, widthSegments, heightSegments){
    Geometry.call(this);

    this.type = 'CapsuleGeometry';

    this.parameters = {
        capsule : capsule,
        widthSegments : widthSegments,
        heightSegments : heightSegments
    };
    
    this.fromBufferGeometry(new THREE.CapsuleBufferGeometry(sphere1, sphere2, widthSegments, heightSegments));
    this.mergeVertices();
}

THREE.CapsuleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CapsuleGeometry.prototype.constructor = THREE.CapsuleGeometry;

THREE.CapsuleBufferGeometry = function(capsule, widthSegments, heightSegments)
{
    THREE.BufferGeometry.call(this);

    this.type = 'CapsuleBufferGeometry';

    this.parameters = {
        capsule : capsule,
        heightSegments : heightSegments,
        widthSegments : widthSegments
    };

    widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
    heightSegments = Math.max( 6, Math.floor( heightSegments ) || 6 );

    var radius1 = capsule.sphere1.radius;
    var center1 = capsule.sphere1.center;

    var radius2 = capsule.sphere2.radius;
    var center2 = capsule.sphere2.center;

    var up = new THREE.Vector3(0, 1, 0);
    var m = new THREE.Matrix4();
    m.lookAt(center2, center1, up);

    var sphere1 =  new THREE.SphereBufferGeometry(radius1, widthSegments, heightSegments / 3, 0, Math.PI * 2, 0, Math.PI * 0.5);
    sphere1.rotateX(-Math.PI * 0.5);
    sphere1.applyMatrix(m);
    sphere1.translate(center1.x, center1.y, center1.z);
    
    var sphere2 =  new THREE.SphereBufferGeometry(radius2, widthSegments, heightSegments / 3, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5);
    sphere2.rotateX(-Math.PI * 0.5);
    sphere2.applyMatrix(m);
    sphere2.translate(center2.x, center2.y, center2.z);

    this.copy(THREE.BufferGeometryUtils.mergeBufferGeometries([sphere1, sphere2]));

    //connect spheres
    var sphereVertices = sphere1.attributes.position.count;
    var indices = Array.prototype.slice.call(this.index.array);
    var start = sphereVertices - widthSegments;

    var a = start + widthSegments - 1;
    var b = start;
    var c = start + widthSegments*2;
    var d = start + widthSegments +1;
    indices.push(a, c, b);
    indices.push(b, c, d);
        
    for(var i = 0; i < widthSegments; ++i)
    {
        a = start + i;
        b = start + i + 1;
        c = start + widthSegments + i + 1;
        d = start + widthSegments + i + 2;
        indices.push(a, c, b);
        indices.push(b, c, d);
    }
    this.setIndex(indices);

    this.computeVertexNormals();
}

THREE.CapsuleBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.CapsuleBufferGeometry.prototype.constructor = THREE.CapsuleBufferGeometry;