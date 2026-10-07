<?php

namespace App\Http\Controllers;
use App\Models\Product;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'data' => $products
        ], 200);
    }

    
    public function show($id)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ], 200);
    }

   
    public function store(Request $request)
    {
        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thêm sản phẩm thành công',
            'data' => $product
        ], 201);
    }

    
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->quantity = $request->quantity;

        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật sản phẩm thành công',
            'data' => $product
        ], 200);
    }

    // Xóa sản phẩm
    public function destroy($id)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa sản phẩm thành công'
        ], 200);
    }
}
