## Using Jest

Jest is a test tool that is based on taking a "picture" of the app and compare future versions against this picture, looking for changes.

The first time Jest is run it will save a snapshot-file that describes the end-product of the imported components, and every time a test is run after this it creates a temporary snapshot-file and compares it to the saved snapshot. If there is any difference at all the test will fail and the difference will be printed.

To run all all jest tests simply type
```
yarn jest
```

If the test fails take a look at what the diff and see if it makes sense and run the application and see if the component looks like it should.
If you did change something in the component and everything is working like you should you have to update the snapshot.
To update a snapshot type
```
yarn jest -- -u
```
the "--" is for skipping yarn options and the "-u" is shorthand for update.

To create a new test create a file named <component>.react-test.js in /interlecture/client/\_\_tests\_\_ where you import the component to be tested.
In some components we are connecting the redux-state to the component, so that a redux-infused component is exported. To solve this problem we can mock the redux-state, which needs a bit of work to get up and running, or we can just export the component before the state is connected. This is the case for the Classroom component.
Take a look at classroom.react-test.js to see a working example.

If you want to run jest tests everytime you save a file that is being tested you can type
```
yarn test:watch
```
This has been defined in package.json, and is just a short for
```
yarn jest -- --watch
```
