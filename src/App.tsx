import React, { useEffect, useState } from 'react';
import { BsSunFill, BsFillCloudRainFill, BsWind } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';

import Header from './app/pages/Components/Header/Header';
import api from './app/utils/Api/Api';

const App = () => {

    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Augosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const weeksNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado',
    ];
    const date = new Date();
    
    const [ data, setData ] = useState<IDataUser>();
    const [ task, setNewTask] = useState<object>({});
    const [ success, setSuccess ] = useState('');
    const [ error, setError ] = useState();

    const fetchData = async () => {
        await api.get(`/list-all-tasks/${localStorage.getItem('userId')}`)
            .then(response =>{setData(response.data[0]);})
            .catch(error => setError(error));
    };

    const handleNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        const { date, title, description, hour  }: IHandleTask = task;

        await api.post('/create-task', { 
            userId: userId,
            allTasks: [{
                date: `${date} 00:00`,  
                tasks: [{
                    title,
                    description,
                    hour
                }]
            }]})
            .then(() =>{ 
                setSuccess('Tarefa adicionada com sucesso!');
                fetchData();
            })
            .catch(error => setError(error));
    };

    const deleteOneTask = async (params: object) => {
        await api.delete('/delete-one-task', { data: params })
            .then(() => {
                setSuccess('Tarefa deletada com sucesso!');
                fetchData();
            }).catch(error => console.log('passei aqui'));
    };

    const completeOneTask = async (params: object) => {
        await api.put('/complete-one-task', { data: params })
            .then(() => {
                setSuccess('Tarefa deletada com sucesso!');
                fetchData();
            }).catch(error => setError(error));
    };

    useEffect(()=>{
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <section className='col-md-10 mx-auto mt-5 text-white'>
            
                <article className='mb-5'>
                    {/* <h1>Olá <b>{`${data?.[0].firstName} - ${data?.[0].lastName}`}</b></h1> */}
                </article>

                <article className='row'>

                    <div className='col-md-7'>
                        <div className='border-dft border-rad-dft p-5'>
                            <div className='border-bottom-dft'>
                                <div className='d-flex'>
                                    <h3>{weeksNames[date.getDay()]}</h3>
                                    <h3 className='ml-5'>{date.getDate()}</h3>
                                </div>
                                <h6 className='font-weight-bold'>{monthNames[date.getMonth()]}</h6>
                            </div>

                            <div className='d-block'>

                                {data?.allTasks.map((firstElement, key)=>(
                                    <article key={key}>
                                        <>
                                            <div className='bg-dft-2 border-rad-dft'>
                                                { firstElement.tasks.length >= 1 ? 
                                                    <h5 
                                                        className='pt-3 mt-3 ml-5 mb-3 text-green-dft'
                                                    >{firstElement.date}</h5> : '' }
                                    
                                                {firstElement.tasks.map((element, key)=>(
                                                    <div key={key} 
                                                        className="d-flex ml-5 mr-5 justify-content-between">
                                                        {element.taskComplete === false ?
                                                            <>
                                                                <div>
                                                                    <input 
                                                                        type="checkbox" 
                                                                        id={`task${key}-${element._id}`} 
                                                                        onChange={
                                                                            ()=> completeOneTask({
                                                                                userId: localStorage.getItem('userId'),
                                                                                dateId: firstElement._id, 
                                                                                taskId: element._id 
                                                                            })}
                                                                    />
                                                                    <label 
                                                                        htmlFor={`task${key}-${element._id}`}
                                                                        className="ml-3">
                                                                        <b>{element.title}</b>
                                                                    </label>
                                                                </div>
                                                                <p>{element.description}</p>
                                                                <p>{element.hour}</p>
                                                                <button onClick={
                                                                    ()=> deleteOneTask({
                                                                        userId: localStorage.getItem('userId'),
                                                                        dateId: firstElement._id, 
                                                                        taskId: element._id 
                                                                    })} className="botton-close"><RiCloseFill/></button>
                                                            </> : ''
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    </article>
                                ))}

                            </div>

                            <button 
                                className='text-uppercase botton-2 mt-5' 
                                data-toggle="modal" 
                                data-target="#exampleModal">
                                <FiPlus />
                            </button>
                        </div>

                    </div>

                    <div className='col-md-5'>
                        <div className='border-dft border-rad-dft p-5'>
                            <div className='d-block'>
                                <h3>Concluidas</h3>
                                {data?.allTasks.map((firstElement, key)=>(
                                    <article key={key}>
                                        <>
                                            {firstElement.tasks.map((element, key)=>(
                                                <div key={key}>
                                                    {element.taskComplete === true ?
                                                        <>
                                                            <span className='text-green-dft p-3'>{firstElement.date}</span>
                                                            <div className='bg-dft-2 p-3 mb-3 border-rad-dft'>
                                                                <input type="checkbox" checked readOnly={true} id={`task${key}-${element._id}`} />
                                                                <label 
                                                                    htmlFor={`task${key}-${element._id}`}
                                                                    className="ml-3">
                                                                    <b>{element.title}</b>
                                                                </label>
                                                                <p>{element.description}</p>
                                                                <p>{element.hour}</p>
                                                            </div>
                                                        </> : ''
                                                    }
                                                </div>
                                            ))}
                                        </>
                                    </article>
                                ))}

                            </div>
                        </div>                                   

                    </div>
                </article>


                <article className='text-right mt-5'>
                    <h1 className='text-uppercase'>são paulo</h1>
                    <hr />

                    <div className='text-left icon font-weight-bold'>
                        <span className='border-right'>
                            <BsSunFill />24°
                        </span>
                        <span className='border-right'>
                            <BsFillCloudRainFill />40%
                        </span>
                        <span>
                            <BsWind />9 m/s
                        </span>
                    </div>
                </article>

                {/* Modal */}
                <article>
                    <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog col-md-12">
                            {
                                success ? 
                                    <div className="alert alert-success text-center" role="alert">
                            Tarefa adicionada com sucesso
                                    </div> : ''
                            }{
                                error ? 
                                    <div className="alert alert-danger text-center" role="alert">
                            Algo deu Errado tente novamente
                                    </div> : ''
                            }
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Adicionar nova tarefa</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleNewTask} className="container">
                                        <input type="text" 
                                            placeholder="Titulo da tarefa"
                                            onChange={e=>{ setNewTask({...task, title: e.target.value}); }} 
                                            className="form-control" 
                                            required />
                                        <br />
                                        <input type="date" 
                                            placeholder="Data"
                                            onChange={e=>{ setNewTask({...task, date: e.target.value}); }} 
                                            className="form-control"
                                            required />
                                        <br />
                                        <input type="text" 
                                            placeholder="Add uma descrição"
                                            onChange={e=>{ setNewTask({...task, description: e.target.value}); }} 
                                            className="form-control" />
                                        <br />
                                        <input type="hour" 
                                            placeholder="Hora"
                                            onChange={e=>{ setNewTask({...task, hour: e.target.value}); }} 
                                            className="form-control" />

                                        <input type="submit" className="btn btn-primary" value="Adicionar" />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </article>

            </section>
        </>
    );
};

export default App;
