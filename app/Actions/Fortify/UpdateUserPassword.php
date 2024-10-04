<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\UpdatesUserPasswords;

class UpdateUserPassword implements UpdatesUserPasswords
{
    use PasswordValidationRules;

    /**
     * Validate and update the user's password.
     *
     * @param array<string, string> $input
     */
    public function update(User $user, array $input): void
    {
        Validator::make($input, [
            'current_password' => [
                'required',
                'string',
                function (string $attribute, mixed $value, Closure $fail) use ($user) {
                    if ($value !== $user->password) {
                        $fail("The {$attribute} is invalid.");
                    }
                }],
            'password' => $this->passwordRules(),
        ], [
            'current_password.current_password' => __('The provided password does not match your current password.'),
        ])->validateWithBag('updatePassword');

        $user->forceFill([
            'password' => $input['password'],
        ])->save();
    }
}
