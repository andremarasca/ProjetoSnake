


S = 1 * ones(M, N, 3);
S(:,:,1) = 200 * S(:,:,1);
S(:,:,2) = 160 * S(:,:,2);
S(:,:,3) = 120 * S(:,:,3);
Rg = 110;
for i = 1 : M
    for j = 1 : N
        for k = 1 : length(lsi)
            i0 = lsi(k);
            j0 = lsj(k);
            dist = (i - i0)^2 + (j - j0)^2;
            if (Rg-0.5)^2 <= dist && dist <= (Rg+0.5)^2
                S(i, j, :) = preto;
            end
        end
    end
end

imwrite(uint8(S), 'testes.png');