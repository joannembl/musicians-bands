const {sequelize} = require('./db');
const {Band, Musician} = require('./index')
const {bandData, musicianData} = require('./seedTest')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // const newBand = await Band.create({
        //     name: 'SOJA',
        //     genre: 'Reggae'
        // });
        // expect(newBand.name).toBe('SOJA');

        const newBand1 = await Band.create(bandData[0])
        expect(newBand1.name).toBe(bandData[0].name)
        expect(newBand1.genre).toBe(bandData[0].genre)
    })

    test('deleting band', async () => {
        const foundBand = await Band.findAll();
        const deletedBand = await foundBand[0].destroy();
        expect(deletedBand.name).toBe(bandData[0].name);
    })

    test('can create a Musician', async () => {
        const newMusician = await Musician.create(musicianData[0])
        expect(newMusician.name).toBe(musicianData[0].name);
        expect(newMusician.genre).toBe(musicianData[0].genre)
    })

    test('deleting musician', async () => {
        const foundMusician = await Musician.findAll();
        const deletedMusician = await foundMusician[0].destroy();
        expect(deletedMusician.name).toBe(musicianData[0].name);
    })

    /*
     * Optional test to show associations:
        - I've completed this test for you
        - I've left it here for you to see how to go about testing associations 
    */

    // test('Band can have many Musicians', async () => {
    //     await sequelize.sync({ force: true }); // recreate db
    //     let BigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' }); //create band
    //     let GD = await Musician.create({ name: 'G-Dragon', instrument: 'Voice' }); //create musician
    //     let Top = await Musician.create({ name: 'TOP', instrument: 'Voice' }); //create musician
    
    //     await BigBang.addMusician(GD); //add musician to band
    //     await BigBang.addMusician(Top); //add musician to band
    
    //     const musicians = await BigBang.getMusicians(); //get all musicians in band - returns an array
    
    //     expect(musicians.length).toBe(2); //we've added two musicians, so the length should be two
    //     expect(musicians[0] instanceof Musician).toBeTruthy; //checks that the value at index 0 of the list - a musician object, is in fact a musician object
    //   });
})