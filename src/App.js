import { useState } from 'react';
import Field from './components/Field';
import Result from './components/Result';
import StartButton from './components/StartButton';

function App() {
	const [testState, setTestState] = useState({
		running: false,
		done: false,
		result: null
	}) 
	
	const handleStart = () => {
		setTestState({
			running: true,
			done: false,
			result: null
		})
	}

	const handleReset = () => {
		setTestState({
			running: false,
			done: false,
			result: null
		})
	}


	return (
		<div className="App">
			{
				(
					testState.running && <Field setTestState={setTestState} >
									  		<StartButton handleClick={handleReset} text={'Начать заново'} />
									  	 </Field>
				) ||

				(
					testState.done && <Result speed={testState.result.speed} accuracy={testState.result.accuracy} >
									  	  <StartButton handleClick={handleReset} text={'Начать заново'} />
									  </Result>
				) ||

				<StartButton handleClick={handleStart} text={'Начать печатать'} />
			}
		</div>
	);
}

export default App;
