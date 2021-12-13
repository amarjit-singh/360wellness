<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Todo;

class DashboardController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = auth('api')->user();
        $user->fill($request->only('name'));
        $user->save();
        return response()->json([
            'success'   =>  true,
            'message'   =>  'Profile updated successfully!'
        ]);
    }
    
    public function getTodos(Request $request)
    {
        $user = auth('api')->user();
        $todos = $user->todos;
        return response()->json([
            'success'   =>  true,
            'message'   =>  'Successfully fetched todos!',
            'data'      =>  compact('todos')
        ]);
    }

    public function addTodo(Request $request)
    {
        $request->validate([
            'content'      =>  'required'
        ]);
        $data = $request->only('content');
        $data['user_id'] = auth('api')->user()->id;
        $todo = Todo::create($data);
        return response()->json([
            'success'   =>  true,
            'message'   =>  'Successfully saved todo!',
            'data'      =>  compact('todo')
        ]);
    }

    public function editTodo(Request $request, $todo_id)
    {
        $request->validate([
            'content'      =>  'required'
        ]);
        $todo = Todo::find($todo_id);
        $todo->content = $request->content;
        $todo->save();
        return response()->json([
            'success'   =>  true,
            'message'   =>  'Successfully updated todo!',
            'data'      =>  compact('todo')
        ]);
    }

    public function deleteTodo(Request $request, $todo_id)
    {
        $todo = Todo::find($todo_id);
        $todo->delete();
        return response()->json([
            'success'   =>  true,
            'message'   =>  'Successfully deleted todo!',
        ]);
    }
}
