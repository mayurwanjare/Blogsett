import CustomNavbar from "./CustomNavbar";

const Base=({title="Wellcome to our Website",children})=>{

    return (
        <div className="container-fluid p-0 m-0">
            <CustomNavbar />
            
            {children}

        </div>
    );
};

export default Base;