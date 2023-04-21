const assert = require('assert');
const { shallow } = require('enzyme');
const ScoreInterface = require('client/src/components/Scoring/ScoreUI.js');

describe('ScoreInterface', () => {
    it('should render with initial state', () => {
        const wrapper = shallow(<ScoreInterface />);
        const score = wrapper.find('#score').text();
        assert.equal(score, '0');
    });

    it('should update score on mouse enter', () => {
        const wrapper = shallow(<ScoreInterface />);
        wrapper.find('#container1').simulate('mouseenter');
        const isHovering1 = wrapper.state('isHovering1');
        assert.equal(isHovering1, true);
    });

    it('should update score on mouse leave', () => {
        const wrapper = shallow(<ScoreInterface />);
        wrapper.find('#container1').simulate('mouseleave');
        const isHovering1 = wrapper.state('isHovering1');
        assert.equal(isHovering1, false);
    });

    it('should set score to 100 if score is greater than 100', () => {
        const wrapper = shallow(<ScoreInterface />);
        wrapper.setState({ score: 150 });
        const score = wrapper.find('#score').text();
        assert.equal(score, '100');
    });
});
