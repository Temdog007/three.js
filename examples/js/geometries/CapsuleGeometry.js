/**
 * @author Temdog007 / http://github.com/Temdog007
 */

THREE.CapsuleGeometry = function(capsule, heightSegments, radialSegments){
    Geometry.call(this);

    this.type = 'CapsuleGeometry';

    this.parameters = {
        capsule : capsule,
        heightSegments : heightSegments,
        radialSegments : radialSegments
    };

    this.fromBufferGeometry(new THREE.CapsuleBufferGeometry(sphere1, sphere2, heightSegments, radialSegments));
    this.mergeVertices();
}

THREE.CapsuleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CapsuleGeometry.prototype.constructor = THREE.CapsuleGeometry;

THREE.CapsuleBufferGeometry = function(capsule, radialSegments, heightSegments)
{
    THREE.BufferGeometry.call(this);

    this.type = 'CapsuleBufferGeometry';

    this.parameters = {
        capsule : capsule,
        heightSegments : heightSegments,
        radialSegments : radialSegments
    };

    var radius1 = capsule.sphere1.raduis;
    var center1 = capsule.sphere1.center;

    var radius2 = capsule.sphere2.radius;
    var center2 = capsule.sphere2.center;

    var sphere1 =  new THREE.SphereBufferGeometry(radius, radialSegments, heightSegments / 3)
    var sphere2 =  new THREE.SphereBufferGeometry(radius, radialSegments, heightSegments / 3)
    
    var v = new THREE.Vector3().subVectors(center1, center2);
    var u = new THREE.Vector3(0, v.length(), 0);
    var cylinder = new THREE.CylinderBufferGeometry(radius1, radius2, v.length(), radialSegments, heightSegments / 3, true);
    
    this.copy(THREE.BufferGeometryUtils.mergeBufferGeometries([sphere1, sphere2, cylinder]));

    // rotate the capsule to the actual sphere points
    // http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors
    var cross = new THREE.Vector3().crossVectors(u, v);

    var quaternion = new THREE.Quaternion(u.dot(v), cross.x, cross.y, cross.z);
    quaternion.w += quaternion.length();
    quaternion.normalize();

    var matrix = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
    this.applyMatrix(matrix);

}

THREE.CapsuleBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.CapsuleBufferGeometry.prototype.constructor = THREE.CapsuleBufferGeometry;