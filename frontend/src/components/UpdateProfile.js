import React, { useState, useContext, useEffect } from "react"
import { GlobalContext } from "../GlobalContext"

export default function UpdateProfile() {
  const globalContext = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: {
      value: '',
      validate: () => {
        return this.value.trim() !== '';
      }
    }
  });
  useEffect(() => {
    globalContext.initAxios()
    setForm((state) => {
      let updated = {...state};
      Object.keys(updated).forEach(function(fieldName) {
        if (globalContext.authenticatedUser[fieldName]) updated[fieldName].value = globalContext.authenticatedUser[fieldName];
      });
      return updated;
    });
  }, [globalContext.authenticatedUser]);
  function setValue(event) {
    let {name, value} = event.target
    setForm((state) => {
      let updated = {...state};
      updated[name].value = value
      return updated;
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    Object.keys(form).forEach(function(fieldName) {
      form[fieldName].validate.bind(form[fieldName])
    });
    setLoading(true)
    globalContext.axios
      .post("http://localhost/360wellness/test/backend/public/api/update-profile")
      .then(res => {
        if (res.data.success) {
          globalContext.setAuthenticatedUser((state) => {
            let user = {...state};
            Object.keys(form).forEach(function(fieldName) {
              user[fieldName] = form[fieldName].value;
            });
            return user;
          })
          alert('Profile updated successfully');
        } else {
          console.error(res.data);
        }
      }).finally(() => {
        setLoading(false)
      });
  }
  return (
    <div className="text-center">
      <h1> UpdateProfile</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" onInput={setValue} value={form.name.value}/>
          <button disabled={loading} type="submit"> Update</button>
      </form>
    </div>

  )
}