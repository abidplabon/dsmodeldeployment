import {useState} from 'react';
import "./Form.css";

function Form(){
    const [form,setForm] = useState({
        pragnancies: "",
        glucose: "",
        blood_presure: "",
        skin_thickness: "",
        insuling_level: "",
        bmi: "",
        diabetes_predigree: "",
        age: ""
    });

    const [loading,setLoading] = useState(false);
    const [result,setResult] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();

        const form_data = new FormData();
        form_data.append("1",form.pragnancies);
        form_data.append("2",form.glucose);
        form_data.append("3",form.blood_presure);
        form_data.append("4",form.skin_thickness);
        form_data.append("5",form.insuling_level);
        form_data.append("6",form.bmi);
        form_data.append("7",form.diabetes_predigree);
        form_data.append("8",form.age);

        setLoading(true);

        fetch('https://dsmodeldeployment11.herokuapp.com/predict',{
            method:'POST',
            body: form_data
        })
        .then(response => response.text())
        .then(html =>{
            setResult(html);
            setLoading(false);
        })
    };

    const onChange = (event)=>{
        const name = event.target.name;
        const value= event.target.value;
        setForm({...form,[name]:value});
    }

    const handleClear=()=>{
        setForm({
            pragnancies: "",
            glucose: "",
            blood_presure: "",
            skin_thickness: "",
            insuling_level: "",
            bmi: "",
            diabetes_predigree: "",
            age: ""
        });
        setResult("");
    };


    return(
        <form onSubmit={handleSubmit}>
            <h4>Diabetes Prediction Model</h4>
            <p>Example to Predict Probability of Diabetes</p>
            <input type="number" name="pregnancies" value={form.pragnancies} onChange={onChange} placeholder="Number of Pregnancies" required/>
            <input type="number" name="glucose" value={form.glucose} onChange={onChange} placeholder="Glucose level in Sugar" required/>
            <input type="number" name="blood_presure" value={form.blood_presure} onChange={onChange} placeholder="Blood Pressure" required/>
            <input type="number" name="skin_thickness" value={form.skin_thickness} onChange={onChange} placeholder="Skin Thickness" required/>
            <input type="number" name="insuling_level" value={form.insuling_level} onChange={onChange} placeholder="Insulin level" required/>
            <input type="number" name="bmi" value={form.bmi} onChange={onChange} placeholder="Body Mass Index (BMI)" required/>
            <input type="number" name="diabetes_pedigree" value={form.diabetes_predigree} onChange={onChange} placeholder="Diabetes Pedegree Function" required/>
            <input type="number" name="age" value={form.age} onChange={onChange} placeholder="Age" required/>
            <button type="submit" disabled={loading}>{loading?"Predicting Result...":"Submit Form"}</button>
            {result && <span onClick={handleClear}>Clear Prediction</span>}

            {result && <div dangerouslySetInnerHTML={{__html:result}} className='result'/>}
        </form>
    );
}
export default Form;