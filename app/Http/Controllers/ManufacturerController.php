<?php

namespace App\Http\Controllers;

use App\Models\manufacturer;
use App\Http\Requests\StoremanufacturerRequest;
use App\Http\Requests\UpdatemanufacturerRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Manufacturer/ShowManufacturer', [
            'manufacturers' => manufacturer::all() 
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Manufacturer/CreateManufacturer', [
            'manufacturers' => manufacturer::all() 
        ]);
    }

    public function store(StoremanufacturerRequest $request)
    {
        try{
            $validated = $request->validated();

        if ($request->hasFile('image')) {
            $filename = time() . '_' . $validated['title'] . '_' . $validated['category'] . '.' . $request->image->extension();
            $request->image->move(public_path('assets/manufacturer'), $filename);
            $validated['image'] = $filename;
        }

        manufacturer::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'image' => $validated['image'],
        ]);

        return redirect()->route('manufacturers.index')
            ->with('success', 'Manufacturer created successfully.');
        }catch(\Exception $e){
            \Log::error('Error creating manufacturer: ' . $e->getMessage());
            return redirect()->back()
                ->with('error', 'An error occurred while creating the manufacturer.. Please try again.');
        }
    }

    public function show(manufacturer $manufacturer)
    {
        //
    }

    public function edit(manufacturer $manufacturer)
    {
        return Inertia::render('Admin/Manufacturer/UpdateManufacturer', [
            'manufacturer' => $manufacturer, 
        ]);
    }


    public function update(UpdatemanufacturerRequest $request, Manufacturer $manufacturer)
    {
        $validated = $request->validated();

        // Agar new image upload hui hai
        if ($request->hasFile('image')) {

            // Old image delete
            if ($manufacturer->image) {
                $oldImagePath = public_path('assets/manufacturer/' . $manufacturer->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // New image save
            $imageName = time() . '_' . $validated['title'] . '_' . $validated['category'] . '.' . $request->image->extension();
            $request->image->move(public_path('assets/manufacturer'), $imageName);

            $validated['image'] = $imageName;
        } 
        else {
            // 🚨 VERY IMPORTANT
            unset($validated['image']); // image ko update se hata do
        }

        $manufacturer->update($validated);

        return redirect()
            ->route('manufacturers.index')
            ->with('success', 'Manufacturer updated successfully');
    }




    public function destroy(manufacturer $manufacturer)
    {
        if ($manufacturer->image && file_exists(public_path('assets/manufacturer/' . $manufacturer->image))) {
            unlink(public_path('assets/manufacturer/' . $manufacturer->image));
        }

        $manufacturer->delete();

        return redirect()->route('manufacturers.index')
            ->with('success', 'Manufacturer deleted successfully.');
    }
}
