const assert = require('assert');
const { Map } = require('client/src/components/mapComponents/Map.js');

describe('Map', function() {
    describe('#onMapLoad', function() {
        it('should show the user location marker on the map', function() {
            const wrapper = shallow(<Map />);
            const instance = wrapper.instance();

            // Stub geolocation to return a fixed position
            const stub = sinon.stub(navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
                cb({ coords: { latitude: 51.5074, longitude: -0.1278 } });
            });

            // Simulate map load
            instance.onMapLoad({});

            // Assert that the user location marker is displayed
            assert.ok(wrapper.containsMatchingElement(<UserLocationMarker />));

            stub.restore();
        });
    });
});
