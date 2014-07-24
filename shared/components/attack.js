'use strict';

var _ = require('lodash')
    , utils = require('../utils')
    , ComponentBase = require('../core/component')
    , AttackComponent;

/**
 * Attack component class.
 * @class shared.components.AttackComponent
 * @classdesc Component that adds the ability to attack other entities.
 * @extends shared.core.Component
 */
AttackComponent = utils.inherit(ComponentBase, {
    /**
     * Creates a new component.
     * @constructor
     */
    constructor: function() {
        ComponentBase.apply(this);

        // inherited properties
        this.key = 'attack';
        this.phase = ComponentBase.prototype.phases.LOGIC;

        // internal properties
        this._lastAttackAt = null;
    }
    /**
     * Returns whether the entity can attack.
     * @method shared.components.AttackComponent#canAttack
     * @return {boolean} The result.
     */
    , canAttack: function() {
        var now = _.now()
            , cooldownMsec = this.owner.attrs.get('attackCooldownMsec');

        return _.isUndefined(this._lastAttackAt) || (now - this._lastAttackAt) > cooldownMsec;
    }
    /**
     * Calculates where the player will hit when attacking based on its attributes.
     * @method shared.components.AttackComponent#calculateTarget
     * @return {object} Target position object.
     */
    , calculateTarget: function() {
        var target = this.owner.attrs.get(['x', 'y'])
            , dimensions = this.owner.attrs.get(['width', 'height'])
            , direction = this.owner.attrs.get('direction')
            , range = this.owner.attrs.get('attackRange')
            , halfWidth = dimensions.width / 2
            , halfHeight = dimensions.height / 2;

        target.x += halfWidth;
        target.y += halfHeight;

        switch (direction) {
            case 'left':
                target.x -= halfWidth + range;
                break;
            case 'up':
                target.y -= halfHeight + range;
                break;
            case 'right':
                target.x += halfWidth + range;
                break;
            case 'down':
                target.y += halfHeight + range;
                break;
            default:
                break;
        }

        return target;
    }
});

module.exports = AttackComponent;
