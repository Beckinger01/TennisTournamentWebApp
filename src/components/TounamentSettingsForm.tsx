import { useState } from "react"

const TounamentSettingsForm = () => {
    const [rbIsChecked, setRbIsChecked] = useState(false);

  return (
    <form className="bg-blackT text-white">
        <h1>Tournament Settings</h1>
        <div>
            <label htmlFor="gs/ks">Group Stage/Knockout Stage:</label>
            <p>Classic Tournament Format</p>
            <input type="radio" id="gs/ks"/>
        </div>
        <div>
            <label htmlFor="rb">RoundRobin:</label>
            <p>Everyone vs Everyone</p>
            <input type="radio" id="rb" checked={rbIsChecked === true}/>
            {rbIsChecked && (
                <div>
                    <div>
                        <label htmlFor="HAG">Standard RoundRobin</label>
                        <p>Just a single Round of RoundRobin</p>
                        <input type="radio" id="HAG"/>
                    </div>
                    <div>
                        <label htmlFor="HAG">Home/Away Games:</label>
                        <p>Two Round of RoundRobin</p>
                        <input type="radio" id="HAG"/>
                    </div>
                    <div>
                        <label htmlFor="">Knockout Stage:</label>
                        <p>One Round of Round Robin then SemiFinals and Final</p>
                        <input type="radio" />
                    </div>
                </div>
            )}
        </div>
    </form>
  )
}

export default TounamentSettingsForm