const rewire = require("rewire")
const index = rewire("./index")
const requireAll = index.__get__("requireAll")
// @ponicode
describe("requireAll", () => {
    test("0", () => {
        let callFunction = () => {
            requireAll({ keys: () => ["Data Scientist", "Data Scientist", "Data Scientist"] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            requireAll({ keys: () => ["Marketing", "Software Engineer", "Marketing"] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            requireAll({ keys: () => ["Marketing", "Data Scientist", "Sales"] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            requireAll({ keys: () => ["Sales", "Marketing", "Marketing"] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            requireAll({ keys: () => ["Sales", "Marketing", "Sales"] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            requireAll(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
