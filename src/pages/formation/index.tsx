import { useList, useRegister, useTranslation } from "@refinedev/core";
import { Button, Form, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Formation = () => {
    const { translate: t } = useTranslation();
    const { mutate: register } = useRegister();
    const [form] = Form.useForm();
    const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const[payMethod, setPayMethod] = useState<'cash' | 'card'>('cash');
      const{data:formations,isFetched}=useList({
        resource:"formations",
        pagination:{
          mode:"off"
        }
      })
    const handleSubmit = async () => {
        try {
          setIsLoading(true);
          const values = await form.validateFields();
          await register({ ...values}, {
            onSuccess: () => {
              message.success(t('auth.registerSuccess'));
              form.resetFields();
              setIsLoading(false);
            },
            onError: () => {
              message.error(t('auth.registerError'));
              setIsLoading(false);
            },
          });
        } catch (error: any) {
          message.error(error);
          setIsLoading(false);
        }
    };
    const CourseCard = ({ key,formation }:any) => (
      <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[300px]">
         <Link to={`/formation-enrollment/${formation?.id}`}>
        
           {formation?.thumbnail && <img 
          src={formation?.thumbnail} 
          alt={formation?.title} 
          className="w-full h-40 object-cover"
        />} 
          </Link>
  
        <div className="p-4 flex flex-col justify-between h-[30vh]">
         <Link to={`/formation-enrollment/${formation?.id}`}>
         <p className="mb-2">
        
          </p>
          <h1 style={{fontSize:"1.1rem",fontWeight:"bold",marginBottom:"10px"}}>{formation?.title}</h1>
         
          <div
          style={{
             WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "90ch",
         }} className="text-gray-500 mb-1 max-w-[200px] max-h-[150px]"
          >
            <span>{formation?.description}</span>

          </div>
         
          </Link>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{formation?.price} DZD </span>
            
            <Button 
              onClick={()=>navigate(`/formation-enrollment/${formation?.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {t('courses.enroll')}
            </Button>
          </div>
        </div>
      </div>
    )
    return (
        <div className='flex  min-h-[90vh]'>
            <div className='flex flex-col gap-4 rounded-lg p-10'>
              {/* {formations ? formations?.data?.map((formation:any)=>
          <Card style={{width:"600px"}}>
        <div className='flex items-end gap-3 w-full'>
          <div>
      <img src={formation.thumbnail} alt="" className='img max-w-[200px]' />
          </div>
          <div>
          <h1>{formation.title}</h1>
          <p>{formation.description}</p>
            <p>{formation.location}</p>
          <p>{dayjs(formation.date).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        </div>
          <Button style={{float:"right"}} type='primary' onClick={()=>navigate(`/formation-enrollment/${formation.id}`)}>Enrol</Button>
          </Card>)
          :null} */}
            <>
            {isFetched && formations?.data ? (
              <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {formations?.data?.map((formation:any) => 
                  <CourseCard key={formation.id} formation={formation} />
                )}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">{t('courses.noCoursesFound')}</h3>
                <p className="text-gray-600">{t('courses.tryAdjustingFiltersOrSearchTerms')}</p>
              </div>
            )}
            </>
                 
    </div>
    </div>
    )
}
