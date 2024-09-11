"use client"

import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import HomeTest from "../Test/page"
import { useRouter } from "next/navigation"

export default function Signup(){
  
  const router = useRouter();
    const{ register, handleSubmit,formState: { errors }} = useForm()
    function submitDone(data){
        console.log(data)
        if(data){
          axios.post("api/users" ,data).then(function(resp){
            console.log(resp.data)
          })
            toast.success("login is success")
            router.push('./Test/') 
        } 


    }
    return <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit(submitDone)}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i
                        className="fas fa-cubes fa-2x me-3"
                        style={{ color: "#ff6219" }}
                      />
                      <span className="h1 fw-bold mb-0">Signup</span>
                    </div>
                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: 1 }}
                    >
                      Signup  your account
                    </h5>
                    <div data-mdb-input-init="" className="form-outline mb-4">
                      <input 
                      {...register("user_name",{required:true})}

                     
                      placeholder="User Name"
                        type="text"
                        id="form2Example17"
                        className="form-control form-control-lg"
                      />

                      {errors.user_email ?<div style={{color:"red"}}><b>  This field is required</b></div>:null}
                     
                    </div>
                    <div data-mdb-input-init="" className="form-outline mb-4">
                      <input 
                      {...register("user_email",{required:true})}

                     
                      placeholder="Email Address"
                        type="email"
                        id="form2Example17"
                        className="form-control form-control-lg"
                      />

                      {errors.user_email ?<div style={{color:"red"}}><b>  This field is required</b></div>:null}
                     
                    </div>
                    <div data-mdb-input-init="" className="form-outline mb-4">
                      <input
                      {...register("user_password",{required:true,minLength:6})}
                      placeholder="Password"
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                      />
                       {errors.user_password && errors.user_password.type =="required"?<div style={{color:"red"}}><b>  This field is required</b></div>:null}
                       {errors.user_password  &&errors.user_password.type =="minLength"?<div style={{color:"red"}}><b>  This field is required atleats 6 charachter</b></div>:null}
                     
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        data-mdb-button-init=""
                        data-mdb-ripple-init=""
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                       Signup
                      </button>
                    </div>
                    <a className="small text-muted" href="#!">
                      Forgot password?
                    </a>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      if you have registered?{" "}
                      <a href="#!" style={{ color: "#393f81" }}>
                        SignIn here
                      </a>
                    </p>
                    <a href="#!" className="small text-muted">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        
}  